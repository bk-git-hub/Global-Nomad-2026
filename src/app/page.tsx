import Header from "@/components/layout/header";
import { getActivities } from "./api/get-activities";
import { Activity } from "@/types/activities";
import BannerCard from "@/components/home/banner/banner-card";
import Banner from "@/components/home/banner/banner";
import SearchBar from "@/components/home/search-bar";
import PopularActivities from "@/components/home/popular-activites/popular-activities";
import PopularActivityCard from "@/components/home/popular-activites/popular-activity-card";

export default async function Home() {
  const bannerActivities = await getActivities();
  const popularActivities = await getActivities({ sort: "most_reviewed" });

  return (
    <div>
      <main className="flex flex-col">
        <Header />
        <Banner>
          {bannerActivities.map((activity) => (
            <BannerCard
              key={activity.id}
              id={String(activity.id)}
              title={activity.title}
              imageUrl={activity.bannerImageUrl}
            />
          ))}
        </Banner>
        <div className="w-full px-4">
          <SearchBar />
          <PopularActivities>
            {popularActivities.map((activity) => (
              <PopularActivityCard
                key={activity.id}
                ratings={activity.rating}
                title={activity.title}
                imageUrl={activity.bannerImageUrl}
                id={String(activity.id)}
                reviewCount={activity.reviewCount}
                price={activity.price}
              />
            ))}
          </PopularActivities>
        </div>
      </main>
    </div>
  );
}
