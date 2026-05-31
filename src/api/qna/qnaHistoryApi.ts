import { ApiErrorException, resolveBaseUrl } from "@/api/client";
import { tokenStorage } from "@/lib/tokenStorage";
import type {
  QnaHistoryDetail,
  QnaHistoryItem,
} from "@/api/qna/qnaTypes";

/** 인증 헤더 — 토큰 없으면 401 가능. */
function authHeaders(): Record<string, string> {
  const token = tokenStorage.getAccessToken();
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

async function handle<T>(r: Response, fallback: string): Promise<T> {
  if (!r.ok) {
    const data = (await r.json().catch(() => ({}))) as { detail?: string };
    throw new ApiErrorException(
      "QNA_HISTORY_FAILED",
      typeof data.detail === "string" ? data.detail : fallback,
      r.status,
    );
  }
  return (await r.json()) as T;
}

export async function fetchQnaHistory(): Promise<QnaHistoryItem[]> {
  const r = await fetch(`${resolveBaseUrl("/ai/qna/history")}/ai/qna/history`, {
    method: "GET",
    headers: authHeaders(),
  });
  return handle<QnaHistoryItem[]>(r, "분석 기록을 불러오지 못했습니다.");
}

export async function fetchQnaHistoryDetail(id: number): Promise<QnaHistoryDetail> {
  const r = await fetch(`${resolveBaseUrl("/ai/qna/history")}/ai/qna/history/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });
  return handle<QnaHistoryDetail>(r, "분석 기록 상세를 불러오지 못했습니다.");
}

export async function deleteQnaHistory(id: number): Promise<void> {
  const r = await fetch(`${resolveBaseUrl("/ai/qna/history")}/ai/qna/history/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!r.ok && r.status !== 204) {
    const data = (await r.json().catch(() => ({}))) as { detail?: string };
    throw new ApiErrorException(
      "QNA_HISTORY_DELETE_FAILED",
      typeof data.detail === "string" ? data.detail : "삭제에 실패했습니다.",
      r.status,
    );
  }
}
