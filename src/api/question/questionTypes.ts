export interface GenerateQuestionsRequest {
  title: string;
  target_school: string;
  target_major: string;
  interview_type: string;
  /**
   * 생기부 항목(category)별로 생성할 질문 개수.
   * 백엔드 측 카테고리: 성적 / 세특 / 창체 / 행특 / 기타.
   * 권장 범위 50~100.
   */
  questions_per_category: number;
}

/**
 * 항목별 질문 생성 개수의 권장 범위 및 기본값.
 * 백엔드가 이 값을 존중해 카테고리당 questions_per_category 개수만큼
 * 생성하도록 요청한다.
 */
export const QUESTIONS_PER_CATEGORY_MIN = 50;
export const QUESTIONS_PER_CATEGORY_MAX = 100;
export const QUESTIONS_PER_CATEGORY_DEFAULT = 75;

export interface GenerateQuestionsSSEEvent {
  type: "processing" | "complete";
  progress: number;
}

export interface Question {
  questionId: number;
  content: string;
  category: string;
  difficulty: string;
  purpose: string;
  answerPoints: string;
  modelAnswer: string;
  evaluationCriteria: string;
  isBookmarked: boolean;
}
