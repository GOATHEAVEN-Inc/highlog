import { apiClient } from "../client";
import type { ToggleBookmarkResponse, BookmarkItem } from "./bookmarkTypes";

export async function toggleBookmark(
  questionId: number
): Promise<ToggleBookmarkResponse> {
  return await apiClient<ToggleBookmarkResponse>("/api/bookmarks", {
    method: "POST",
    body: JSON.stringify({ questionId }),
  });
}

export async function getBookmarkList(): Promise<BookmarkItem[]> {
  return await apiClient<BookmarkItem[]>("/api/bookmarks", {
    method: "GET",
  });
}
