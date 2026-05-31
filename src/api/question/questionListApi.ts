import { apiClient } from "../client";
import type { Question } from "./questionTypes";

export async function getQuestionList(
  setId: number,
  category?: string
): Promise<Question[]> {
  const url = category
    ? `/api/question-sets/${setId}/questions?category=${category}`
    : `/api/question-sets/${setId}/questions`;

  return await apiClient<Question[]>(url, {
    method: "GET",
  });
}
