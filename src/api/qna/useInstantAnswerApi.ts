import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { requestInstantAnswer } from "@/api/qna/qnaApi";
import type {
  InstantAnswerRequest,
  InstantAnswerResponse,
} from "@/api/qna/qnaTypes";

export function useInstantAnswer(
  options?: UseMutationOptions<
    InstantAnswerResponse,
    Error,
    InstantAnswerRequest
  >,
): UseMutationResult<InstantAnswerResponse, Error, InstantAnswerRequest> {
  return useMutation({
    mutationFn: requestInstantAnswer,
    ...options,
  });
}
