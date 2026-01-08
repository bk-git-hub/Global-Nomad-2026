import ActivityGrid from "./activity-grid";
import CategoryBar from "./category-bar";

export default async function ActivityGridContainer({
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

  return (
    <div className="flex flex-col gap-4">
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
      <ActivityGrid
        page={page}
        category={category}
        sort={sort}
        keyword={keyword}
      />
    </div>
  );
}
