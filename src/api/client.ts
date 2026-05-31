import { tokenStorage } from "@/lib/tokenStorage";
import { invokeAuthFailure } from "@/lib/authFailureCallback";

/**
 * BASE_URL: 단일 도메인(nginx + path routing) 환경에서 사용.
 * 로컬 개발은 빈 문자열 → Vite proxy(`/api` → 8080, `/ai` → 8000)가 처리.
 */
const LEGACY_BASE = import.meta.env.VITE_API_URL ?? "";

/**
 * Production에서는 Spring과 FastAPI가 서로 다른 도메인일 수 있어
 * path prefix에 따라 base를 분기한다. 미설정 시 LEGACY_BASE로 fallback.
 *   - VITE_SPRING_API_URL: `/api/*`, `/auth/*` 등 Spring 라우트
 *   - VITE_AI_API_URL:     `/ai/*` 로 시작하는 FastAPI 라우트
 */
const SPRING_BASE: string =
  (import.meta.env.VITE_SPRING_API_URL as string | undefined) ?? LEGACY_BASE;
const AI_BASE: string =
  (import.meta.env.VITE_AI_API_URL as string | undefined) ?? LEGACY_BASE;

/** path prefix에 따라 적절한 base URL을 반환. */
export function resolveBaseUrl(path: string): string {
  if (path.startsWith("/ai/") || path === "/ai") return AI_BASE;
  return SPRING_BASE;
}

/**
 * 호환을 위한 기존 export. 새 코드에서는 `resolveBaseUrl(path)`를 권장.
 * 단일 BASE_URL 사용처는 path를 알 수 없으므로 SPRING_BASE를 가리킨다 —
 * 그 경우 호출부가 `/ai/*` 경로면 직접 AI_BASE 또는 resolveBaseUrl을 써야 함.
 */
export const BASE_URL = SPRING_BASE;

export interface ApiError {
  code: string;
  message: string;
}

export class ApiErrorException extends Error {
  readonly code: string;
  readonly status?: number;

  constructor(code: string, message: string, status?: number) {
    super(message);
    this.name = "ApiErrorException";
    this.code = code;
    this.status = status;
  }
}

/** mutation onError 등에서 Error를 ApiError로 파싱 */
export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiErrorException) {
    return { code: error.code, message: error.message };
  }
  if (error instanceof Error) {
    try {
      const parsed = JSON.parse(error.message) as ApiError;
      if (parsed.code && parsed.message) return parsed;
    } catch {
      // ignore
    }
    return { code: "UNKNOWN_ERROR", message: error.message };
  }
  return {
    code: "UNKNOWN_ERROR",
    message: "알 수 없는 오류가 발생했습니다.",
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const code = (data as { code?: string }).code ?? "UNKNOWN_ERROR";
    const message =
      (data as { message?: string }).message ??
      "요청 처리 중 오류가 발생했습니다.";
    throw new ApiErrorException(code, message, response.status);
  }

  return data as T;
}

async function refreshAndRetry<T>(
  endpoint: string,
  init: RequestInit,
): Promise<T> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    invokeAuthFailure();
    throw new ApiErrorException("UNAUTHORIZED", "다시 로그인해 주세요.", 401);
  }

  const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshRes.ok) {
    tokenStorage.clear();
    invokeAuthFailure();
    const data = await refreshRes.json().catch(() => ({}));
    throw new ApiErrorException(
      (data as { code?: string }).code ?? "UNAUTHORIZED",
      (data as { message?: string }).message ?? "다시 로그인해 주세요.",
      401,
    );
  }

  const refreshData = (await refreshRes.json()) as {
    accessToken: string;
    refreshToken: string;
  };
  tokenStorage.updateTokens(refreshData.accessToken, refreshData.refreshToken);

  const newHeaders = new Headers(init.headers);
  newHeaders.set("Authorization", `Bearer ${refreshData.accessToken}`);

  const retryRes = await fetch(`${BASE_URL}${endpoint}`, {
    ...init,
    headers: newHeaders,
  });

  return handleResponse<T>(retryRes);
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit & { accessToken?: string } = {},
): Promise<T> {
  const { accessToken: explicitToken, ...init } = options;
  const accessToken = explicitToken ?? tokenStorage.getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> || {}),
  };

  if (init.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...init,
    headers,
  });

  // 로그인/회원가입/로그아웃은 401이 credential 오류이므로 refresh 시도 안 함
  const shouldRefresh =
    response.status === 401 &&
    endpoint !== "/api/auth/refresh" &&
    endpoint !== "/api/auth/login" &&
    endpoint !== "/api/auth/signup" &&
    endpoint !== "/api/auth/logout";

  if (shouldRefresh) {
    return refreshAndRetry<T>(endpoint, init);
  }

  return handleResponse<T>(response);
}

export async function apiClientStream(
  endpoint: string,
  options: RequestInit & { accessToken?: string } = {},
): Promise<Response> {
  const { accessToken: explicitToken, ...init } = options;
  const accessToken = explicitToken ?? tokenStorage.getAccessToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };

  if (accessToken) {
    (headers as Record<string, string>)["Authorization"] =
      `Bearer ${accessToken}`;
  }

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...init,
    headers,
  });

  const shouldRefresh =
    response.status === 401 &&
    endpoint !== "/api/auth/refresh" &&
    endpoint !== "/api/auth/login" &&
    endpoint !== "/api/auth/signup" &&
    endpoint !== "/api/auth/logout";

  if (shouldRefresh) {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      invokeAuthFailure();
      throw new ApiErrorException("UNAUTHORIZED", "다시 로그인해 주세요.", 401);
    }

    const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      tokenStorage.clear();
      invokeAuthFailure();
      const data = await refreshRes.json().catch(() => ({}));
      throw new ApiErrorException(
        (data as { code?: string }).code ?? "UNAUTHORIZED",
        (data as { message?: string }).message ?? "다시 로그인해 주세요.",
        401,
      );
    }

    const refreshData = (await refreshRes.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    tokenStorage.updateTokens(refreshData.accessToken, refreshData.refreshToken);

    const newHeaders = new Headers(init.headers);
    newHeaders.set("Authorization", `Bearer ${refreshData.accessToken}`);

    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...init,
      headers: newHeaders,
    });
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const code = (data as { code?: string }).code ?? "UNKNOWN_ERROR";
    const message =
      (data as { message?: string }).message ??
      "요청 처리 중 오류가 발생했습니다.";
    throw new ApiErrorException(code, message, response.status);
  }

  return response;
}
