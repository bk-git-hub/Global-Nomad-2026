import { getReviews } from "@/app/api/get-reviews";

import ActivityReviewCard from "./activity-review-card";

export default async function ActivityReviewList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const id = param.id;
  const { reviews, totalCount } = await getReviews(Number(id));

  if (totalCount === 0) {
    return (
      <div className="py-20 text-center text-gray-400">
        작성된 후기가 없습니다. 첫 번째 후기를 남겨보세요!
      </div>
    );
  }

  return (
    <section className="flex flex-col px-6 py-10">
      <h2 className="sr-only">사용자 후기 리스트</h2>

      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <ActivityReviewCard review={review} key={review.id} />
        ))}
      </div>
    </section>
  );
}
