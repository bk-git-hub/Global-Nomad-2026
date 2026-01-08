import Header from "@/components/layout/header";
import SearchBar from "@/components/home/search-bar";
import { Suspense } from "react";
import PopularActivitiesContainer from "@/components/home/popular-activites/popular-activity-container";
import ActivityGridContainer from "@/components/home/activiy-grid/activity-grid-container";
import BannerContainer from "@/components/home/banner/banner-container";
export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    keyword?: string;
  }>;
}) {
  return (
    <main className="flex w-full flex-col items-center pb-20">
      <Suspense
        fallback={<div className="h-16 w-screen animate-pulse bg-gray-50" />}
      >
        <Header />
      </Suspense>

      <Suspense
        fallback={<div className="h-100 w-full animate-pulse bg-gray-100" />}
      >
        <BannerContainer />
      </Suspense>

      <div className="w-full px-4">
        <Suspense>
          <SearchBar />
        </Suspense>

        <Suspense
          fallback={<div className="h-60 w-full animate-pulse bg-gray-50" />}
        >
          <PopularActivitiesContainer searchParams={searchParams} />
        </Suspense>

        <section className="mx-auto mt-12 max-w-7xl px-4" id="activity-list">
          <Suspense
            key="activity-grid-suspense"
            fallback={
              <div className="h-96 w-full animate-pulse rounded-xl bg-gray-100" />
            }
          >
            <ActivityGridContainer searchParams={searchParams} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
