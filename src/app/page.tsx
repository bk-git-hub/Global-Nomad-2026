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
// app/page.tsx (HomePage)
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

  const keyword = params.keyword || "";
  const page = Number(params.page) || 1;
  const category = params.category || "전체";
  const sort = params.sort || "latest";

  // 병렬 페칭으로 성능 최적화
  const [bannerData, popularData] = await Promise.all([
    getActivities({ size: 3 }),
    getActivities({ sort: "most_reviewed", size: 8 }),
  ]);

  const bannerActivities = bannerData.activities;
  const popularActivities = popularData.activities;

  return (
    <main className="flex flex-col pb-20">
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

        {/* 검색 중이 아닐 때만 인기 체험 노출 (선택 사항) */}
        {!keyword && (
          <PopularActivities>
            {popularActivities.map((activity) => (
              <PopularActivityCard
                key={activity.id}
                {...activity}
                id={String(activity.id)}
                imageUrl={activity.bannerImageUrl}
                ratings={activity.rating}
              />
            ))}
          </PopularActivities>
        )}

        <section className="mx-auto mt-12 max-w-7xl px-4" id="activity-list">
          <div className="flex flex-col gap-4">
            {/* 조건부 렌더링 영역 */}
            {keyword ? (
              <h2 className="text-2xl font-bold text-gray-900">
                &quot;{keyword}&quot; (으)로 검색한 결과입니다
              </h2>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">전체 체험</h2>
                <CategoryBar currentCategory={category} currentSort={sort} />
              </>
            )}

            <Suspense
              key={`${category}-${page}-${sort}-${keyword}`}
              fallback={
                <div className="h-96 w-full animate-pulse rounded-xl bg-gray-100" />
              }
            >
              {/* ActivityGrid에 keyword 추가 전달 */}
              <ActivityGrid
                page={page}
                category={category}
                sort={sort}
                keyword={keyword}
              />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
