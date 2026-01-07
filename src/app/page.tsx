import Header from "@/components/layout/header";
import { getActivities } from "./api/get-activities";
import { Activity } from "@/types/activities";
import BannerCard from "@/components/home/banner-card";
import Banner from "@/components/home/banner";
import SearchBar from "@/components/home/search-bar";

export default async function Home() {
  const data = await getActivities();
  const activities: Activity[] = data.activities;
  console.log(data.activities[0]);
  return (
    <div>
      <main className="flex flex-col">
        <Header />
        <Banner>
          {activities.map((activity) => (
            <BannerCard
              key={activity.id}
              id={String(activity.id)}
              title={activity.title}
              imageUrl={activity.bannerImageUrl}
            />
          ))}
        </Banner>
        <SearchBar />
      </main>
    </div>
  );
}
