import { Review } from "@/types/reviews";

interface GetReviewReturnType {
  reviews: Review[];
  totalCount: number;
  averageRating: number;
}

export async function getReviews(id: number): Promise<GetReviewReturnType> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/activities/${id}/reviews`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("후기를 불러오는데 실패하였습니다", error);
    return { reviews: [], totalCount: 0, averageRating: 0 };
  }
}
