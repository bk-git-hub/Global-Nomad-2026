import { type Activity } from "@/types/activities";

export interface GetActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: Activity[];
}

export type ActivityCategory =
  | "문화 · 예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

export type ActivitySort =
  | "most_reviewed"
  | "price_asc"
  | "price_desc"
  | "latest";

export type PaginationMethod = "offset" | "cursor";

export interface ActivityParams {
  size?: number;
  page?: number;
  method?: PaginationMethod;
  category?: string;
  keyword?: string;
  sort?: string;
}
export async function getActivities({
  size = 10,
  page = 1,
  method = "offset",
  ...rest
}: ActivityParams = {}): Promise<GetActivitiesResponse> {
  // 반환 타입을 Activity[]로 명시
  const searchParams = new URLSearchParams();
  searchParams.append("method", method);
  searchParams.append("size", String(size));

  if (method === "offset") {
    searchParams.append("page", String(page));
  }

  // 선택적 파라미터(sort, category, keyword) 필터링 및 추가
  Object.entries(rest).forEach(([key, value]) => {
    if (key === "category" && value === "전체") return;
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/activities?${searchParams.toString()}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `에러 발생: ${res.status}`);
    }

    // JSON 응답에서 activities 배열만 추출하여 반환
    return await res.json();
  } catch (error) {
    console.error("[API ERROR] getActivities:", error);
    // 에러 발생 시 런타임 에러 방지를 위해 빈 배열 반환
    return { activities: [], totalCount: 0, cursorId: null };
  }
}
