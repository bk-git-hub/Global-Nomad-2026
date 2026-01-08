import Link from "next/link";
import SortDropdown from "./sort-dropdown";

const CATEGORIES = [
  "전체",
  "문화 · 예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

interface CategoryBarProps {
  currentCategory: string;
  currentSort: string;
}

export default function CategoryBar({
  currentCategory,
  currentSort,
}: CategoryBarProps) {
  return (
    <div className="flex items-center justify-between gap-2" id="activity-list">
      <div className="relative flex-1 overflow-hidden">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto scroll-smooth sm:gap-3">
          {CATEGORIES.map((category) => {
            const isActive = currentCategory === category;
            return (
              <Link
                key={category}
                href={`?category=${encodeURIComponent(category)}&sort=${currentSort}`}
                scroll={false}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all sm:px-6 sm:py-2.5 sm:text-base ${
                  isActive
                    ? "bg-nomad-black border-nomad-black text-white"
                    : "hover:border-nomad-black border-gray-300 bg-white text-gray-700"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-linear-to-l from-white to-transparent" />
      </div>

      <div className="shrink-0">
        <SortDropdown
          currentCategory={currentCategory}
          currentSort={currentSort}
        />
      </div>
    </div>
  );
}
