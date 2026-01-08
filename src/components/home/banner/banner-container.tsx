import { getActivities } from "@/app/api/get-activities";
import Banner from "@/components/home/banner/banner";
import BannerCard from "@/components/home/banner/banner-card";

export default async function BannerContainer() {
  "use cache";
  const { activities } = await getActivities({ size: 3 });

  if (!activities || activities.length === 0) return null;

  return (
    <Banner>
      {activities.map((activity) => (
        <BannerCard
          key={`banner-${activity.id}`}
          id={String(activity.id)}
          title={activity.title}
          imageUrl={activity.bannerImageUrl}
        />
      ))}
    </Banner>
  );
}
