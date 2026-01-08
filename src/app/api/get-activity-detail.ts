import { ActivityDetail } from "@/types/activities";

export async function getActivityDetail({
  id,
}: {
  id: string;
}): Promise<ActivityDetail | null> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/activities/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `에러발생: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("[API ERROR] getActivities:", error);

    return null;
  }
}
