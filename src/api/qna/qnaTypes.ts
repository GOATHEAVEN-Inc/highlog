// 단발 모범답안 API의 요청/응답 타입.
// 백엔드 FastAPI: POST /ai/qna/answer

export const QNA_LENGTH_OPTIONS = ["30초", "60초", "90초"] as const;
export type QnaLength = (typeof QNA_LENGTH_OPTIONS)[number];

export const QNA_TONE_OPTIONS = [
  "차분한",
  "밝은",
  "자신감 있는",
  "담백한",
] as const;
export type QnaTone = (typeof QNA_TONE_OPTIONS)[number];

export const QNA_INTERVIEW_TYPE_OPTIONS = [
  "학생부종합",
  "제시문",
  "인성",
  "전공",
  "기타",
] as const;
export type QnaInterviewType = (typeof QNA_INTERVIEW_TYPE_OPTIONS)[number];

export interface InstantAnswerRequest {
  question: string;
  target_school?: string;
  target_major?: string;
  interview_type?: QnaInterviewType;
  length?: QnaLength;
  tone?: QnaTone;
}

export interface InstantAnswerResponse {
  /** 로그인 사용자 호출 시에만 채워지는 저장 기록 ID. 익명이면 null. */
  history_id: number | null;
  question: string;
  /** "기본" | "심화" | "압박" */
  difficulty: string;
  question_intent: string;
  record_basis: string;
  purpose: string;
  answer_points: string;
  model_answer: string;
  evaluation_criteria: string;
  follow_up_questions: string;
  improvement_tips: string;
  /** 비어 있으면 위험 없음 */
  risk_notes: string;
}

// ─── 질문 분석 기록 (qna_history) ─────────────────────────────────────────

export interface QnaHistoryItem {
  id: number;
  question: string;
  difficulty: string;
  target_school: string | null;
  target_major: string | null;
  length: string | null;
  tone: string | null;
  model_answer: string;
  is_bookmarked: boolean;
  /** ISO 8601 */
  created_at: string;
}

export interface QnaHistoryDetail {
  id: number;
  question: string;
  difficulty: string;
  target_school: string | null;
  target_major: string | null;
  length: string | null;
  tone: string | null;
  question_intent: string | null;
  record_basis: string | null;
  purpose: string | null;
  answer_points: string | null;
  model_answer: string;
  evaluation_criteria: string | null;
  follow_up_questions: string | null;
  improvement_tips: string | null;
  risk_notes: string | null;
  is_bookmarked: boolean;
  created_at: string;
}
