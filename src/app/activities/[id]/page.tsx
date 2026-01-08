import { getActivityDetail } from "@/app/api/get-activity-detail";
import Header from "@/components/layout/header";
import { notFound } from "next/navigation";
import ActivityHeading from "@/components/activity/activity-heading";
import ActivityImageCarousel from "@/components/activity/activity-image-carousel/activity-image-carousel";
import ActivityImageCard from "@/components/activity/activity-image-carousel/activity-image-card";

interface ActivityPageProps {
  params: Promise<{ id: string }>;
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { id } = await params;
  const activityInfo = await getActivityDetail({ id });

  if (activityInfo === null) return notFound();

  const images: string[] = [];
  images.push(activityInfo.bannerImageUrl);
  for (let i = 0; i < activityInfo?.subImages.length - 1; i++) {
    images.push(activityInfo.subImages[i].imageUrl);
  }
  console.log(images);
  return (
    <>
      <Header />
      <main>
        <ActivityHeading activityInfo={activityInfo} />
        <ActivityImageCarousel>
          {images.map((imageUrl, index) => (
            <ActivityImageCard
              key={index}
              imageUrl={imageUrl}
              alt={`${activityInfo.title} ${index + 1} 번째 이미지`}
            />
          ))}
        </ActivityImageCarousel>
      </main>
    </>
  );
}
