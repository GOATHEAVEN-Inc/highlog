export interface CreateQuestionFormData {
  title: string;
  school: string;
  department: string;
  applicationType: string;
  schoolRecord: string;
  recordId: number;
  /** 카테고리별 생성 질문 수(미지정 시 기본값). 온보딩 등에서 더 빠르게 생성하려고 낮춰 전달. */
  questionsPerCategory?: number;
}
