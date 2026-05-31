import { apiClient } from "@/api/client";
import type { RecordListResponse } from "@/api/record/recordTypes";

export async function getRecordList(): Promise<RecordListResponse> {
  return await apiClient<RecordListResponse>("/api/records", {
    method: "GET",
  });
}
