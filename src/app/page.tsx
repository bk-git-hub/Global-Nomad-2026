import Header from "@/components/layout/header";
import { getActivities } from "./api/get-activities";
import BannerCard from "@/components/home/banner/banner-card";
import Banner from "@/components/home/banner/banner";
import SearchBar from "@/components/home/search-bar";
import PopularActivities from "@/components/home/popular-activites/popular-activities";
import PopularActivityCard from "@/components/home/popular-activites/popular-activity-card";
import { Suspense } from "react";
import ActivityGrid from "@/components/home/activiy-grid/activity-grid";
import CategoryBar from "@/components/home/activiy-grid/category-bar";

export default async function HomePage({
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

  // 1. 설계 로직: 파라미터가 없을 때의 Default 설정
  const keyword = params.keyword || "";
  const page = Number(params.page) || 1;
  const category = params.category || "전체";
  const sort = params.sort || "latest";
  const { activities: bannerActivities } = await getActivities();
  const { activities: popularActivities } = await getActivities({
    sort: "most_reviewed",
    size: 8,
  });

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

          <section className="mx-auto mt-12 max-w-7xl px-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-900">전체 체험</h2>
              <CategoryBar currentCategory={category} currentSort={sort} />
              <Suspense
                key={`${category}-${page}-${sort}`}
                fallback={
                  <div className="h-96 w-full animate-pulse rounded-xl bg-gray-100" />
                }
              >
                <ActivityGrid page={page} category={category} sort={sort} />
              </Suspense>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
