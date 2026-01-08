import { getActivities } from "@/app/api/get-activities";
import ActivityGridCard from "./activity-grid-card";
import Link from "next/link";

interface GridProps {
  page: number;
  category: string;
  sort: string;
}

export default async function ActivityGrid({
  page,
  category,
  sort,
}: GridProps) {
  const { activities, totalCount } = await getActivities({
    page,
    category,
    sort: sort,
    size: 8,
    method: "offset",
  });

  const totalPages = totalCount / 8;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {activities.map((activity) => (
          <ActivityGridCard
            key={activity.id}
            id={String(activity.id)}
            title={activity.title}
            ratings={activity.rating}
            imageUrl={activity.bannerImageUrl}
            reviewCount={activity.reviewCount}
            price={String(activity.price)}
          />
        ))}
      </div>

      <nav className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          const href = `/?page=${p}&category=${encodeURIComponent(category)}&sort=${sort}#activity-list`;
          return (
            <Link
              key={p}
              href={href}
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
    </div>
  );
}
