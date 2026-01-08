import { getActivityDetail } from "@/app/api/get-activity-detail";
import { notFound } from "next/navigation";
import ActivityHeading from "@/components/activity/activity-heading";
import ActivityImageCarousel from "@/components/activity/activity-image-carousel/activity-image-carousel";
import ActivityImageCard from "@/components/activity/activity-image-carousel/activity-image-card";
import ActivityDescription from "./activity-description";
import ActivityReviewSummary from "./activity-review/activity-review-summary";

export default async function ActivityDetailContent({ id }: { id: string }) {
  const activityInfo = await getActivityDetail({ id: id });

  if (!activityInfo) return notFound();

  const images: string[] = [];
  images.push(activityInfo.bannerImageUrl);
  for (let i = 0; i < activityInfo?.subImages.length - 1; i++) {
    images.push(activityInfo.subImages[i].imageUrl);
  }

  return (
    <div className="flex w-full flex-col">
      <ActivityHeading activityInfo={activityInfo} />

      <div className="w-full">
        <ActivityImageCarousel key={images.length}>
          {images.map((imageUrl, index) => (
            <ActivityImageCard
              key={`${id}-img-${index}`}
              imageUrl={imageUrl}
              alt={`${activityInfo.title} ${index + 1}번째 이미지`}
            />
          ))}
        </ActivityImageCarousel>
      </div>

      <div className="flex flex-col gap-4 px-6 py-4">
        <ActivityDescription description={activityInfo.description} />
        <ActivityReviewSummary
          rating={activityInfo.rating}
          reviewCount={activityInfo.reviewCount}
        />
      </div>
    </div>
  );
}
