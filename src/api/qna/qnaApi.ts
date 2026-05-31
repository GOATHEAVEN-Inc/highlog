import { ApiErrorException, resolveBaseUrl } from "@/api/client";
import { tokenStorage } from "@/lib/tokenStorage";
import type {
  InstantAnswerRequest,
  InstantAnswerResponse,
} from "@/api/qna/qnaTypes";

/** 면접 질문 1개 → 모범답안 자료 1세트.
 *
 * 인증 미요구지만, 토큰이 있으면 자동으로 첨부한다.
 * 백엔드는 로그인 사용자의 생기부(READY)가 있을 때만 RAG 컨텍스트로 활용.
 */
export async function requestInstantAnswer(
  body: InstantAnswerRequest,
): Promise<InstantAnswerResponse> {
  const accessToken = tokenStorage.getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await fetch(`${resolveBaseUrl("/ai/qna/answer")}/ai/qna/answer`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as {
      detail?: string | unknown;
    };
    // FastAPI의 422는 detail이 배열, 502/504는 문자열.
    const detail = data.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail) && detail.length > 0
          ? "입력 형식이 올바르지 않습니다."
          : "답안 생성에 실패했습니다.";
    throw new ApiErrorException("QNA_FAILED", message, response.status);
  }

  return (await response.json()) as InstantAnswerResponse;
}
