"use client";

import { useState } from "react";
import Link from "next/link";
type ActivitySort = "most_reviewed" | "price_asc" | "price_desc" | "latest";

interface SortDropdownProps {
  currentCategory: string;
  currentSort: string;
}

const SORT_OPTIONS: { label: string; value: ActivitySort }[] = [
  { label: "최신순", value: "latest" },
  { label: "인기순", value: "most_reviewed" },
  { label: "가격 낮은 순", value: "price_asc" },
  { label: "가격 높은 순", value: "price_desc" },
];

export default function SortDropdown({
  currentCategory,
  currentSort,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel =
    SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || "최신순";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-nomad-black text-nomad-black flex items-center gap-2 rounded-[15px] border bg-white px-4 py-2 text-sm font-bold sm:px-5 sm:py-2.5 sm:text-base"
      >
        {currentLabel}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex flex-col">
            {SORT_OPTIONS.map((option) => (
              <Link
                key={option.value}
                href={`/?category=${encodeURIComponent(currentCategory)}&sort=${option.value}`}
                scroll={false}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-sm transition-colors hover:bg-gray-100 ${
                  currentSort === option.value
                    ? "text-nomad-black font-bold"
                    : "text-gray-600"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
