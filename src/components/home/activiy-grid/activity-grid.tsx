import { getActivities } from "@/app/api/get-activities";
import ActivityGridCard from "./activity-grid-card";
import Link from "next/link";
interface GridProps {
  page: number;
  category: string;
  sort: string;
  keyword?: string;
}

export default async function ActivityGrid({
  page,
  category,
  sort,
  keyword,
}: GridProps) {
  const { activities, totalCount } = await getActivities({
    page,
    category,
    sort,
    keyword,
    size: 8,
    method: "offset",
  });

  const totalPages = Math.ceil(totalCount / 8);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {activities.map((activity) => (
          <ActivityGridCard
            key={activity.id}
            {...activity}
            id={String(activity.id)}
            imageUrl={activity.bannerImageUrl}
            ratings={activity.rating}
            price={String(activity.price)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const query = new URLSearchParams({
              page: String(p),
              category: category,
              sort: sort,
            });
            if (keyword) query.set("keyword", keyword);

            return (
              <Link
                key={p}
                href={`/?${query.toString()}#activity-list`}
                scroll={false}
                className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold transition-colors ${
                  page === p
                    ? "bg-nomad-black text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
