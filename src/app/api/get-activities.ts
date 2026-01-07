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
}: ActivityParams = {}) {
  const searchParams = new URLSearchParams();
  searchParams.append("method", method);
  searchParams.append("size", String(size));
  if (method === "offset") {
    searchParams.append("page", String(page));
  }

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  console.log("searchParams :", searchParams);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/activities?${searchParams.toString()}`;
  console.log("url : ", url);
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

    return await res.json();
  } catch (error) {
    console.log("getActivities error : ", error);
  }
}
