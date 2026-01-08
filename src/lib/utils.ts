import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSatisfactionLabel(rating: number) {
  if (rating > 4) return "매우 만족";
  if (rating > 3) return "만족";
  if (rating > 2) return "보통";
  if (rating > 1) return "불만족";
  if (rating > 0) return "매우 불만족";
  return "평점 없음";
}

export function formatRating(rating: number): string {
  return String(rating.toFixed(1));
}
