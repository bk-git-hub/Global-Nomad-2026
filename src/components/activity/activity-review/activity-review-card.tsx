import { Review } from "@/types/reviews";
import Image from "next/image";
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};
export default function ActivityReviewCard({ review }: { review: Review }) {
  return (
    <article
      key={review.id}
      className="flex items-start gap-4 border-b border-gray-100 pb-8 last:border-0"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
        <Image
          src={review.user.profileImageUrl || "/images/default-profile.png"}
          alt={`${review.user.nickname}님의 프로필`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <header className="flex items-center gap-2">
          <span className="font-bold text-gray-900">
            {review.user.nickname}
          </span>
          <span className="text-gray-200" aria-hidden="true">
            |
          </span>
          <time className="text-sm text-gray-400" dateTime={review.createdAt}>
            {formatDate(review.createdAt)}
          </time>
        </header>

        <p className="leading-relaxed break-keep whitespace-pre-wrap text-gray-700">
          {review.content}
        </p>
      </div>
    </article>
  );
}
