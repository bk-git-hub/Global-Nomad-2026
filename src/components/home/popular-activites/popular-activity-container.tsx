import PopularActivities from "./popular-activities";
import PopularActivityCard from "./popular-activity-card";
import { getActivities } from "@/app/api/get-activities";

export default async function PopularActivitiesContainer({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    keyword?: string;
  }>;
}) {
  const params = await searchParams;
  if (params.keyword) return null;

  const { activities } = await getActivities({
    sort: "most_reviewed",
    size: 8,
  });

  return (
    <PopularActivities>
      {activities.map((activity) => (
        <PopularActivityCard
          key={activity.id}
          imageUrl={activity.bannerImageUrl}
          {...activity}
          ratings={activity.rating}
        />
      ))}
    </PopularActivities>
  );
}
