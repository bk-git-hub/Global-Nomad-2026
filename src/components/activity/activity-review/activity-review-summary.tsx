import { formatRating, getSatisfactionLabel } from "@/lib/utils";

interface ActivityReviewProps {
  rating: number;
  reviewCount: number;
}

export default function ActivityReviewSummary({
  rating,
  reviewCount,
}: ActivityReviewProps) {
  const satisfaction = getSatisfactionLabel(rating);
  const formattedRate = formatRating(rating);
  return (
    <section className="flex flex-col gap-4.5">
      <h3 className="text-xl font-bold">후기</h3>

      <div className="flex items-center gap-4">
        <span className="text-[50px] font-bold">{formattedRate}</span>
        <div className="flex flex-col gap-2">
          <span className="text-lg">{satisfaction}</span>
          <span className="text-yellow">
            ★ <span className="text-black">{reviewCount}개의 후기</span>
          </span>
        </div>
      </div>
    </section>
  );
}
