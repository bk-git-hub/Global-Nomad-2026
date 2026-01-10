import Image from "next/image";
import Link from "next/link";

interface ActivityGridCardProps {
  id: string; // id 추가
  title: string;
  ratings: number;
  reviewCount: number;
  imageUrl: string;
  price: string;
}

export default function ActivityGridCard({
  id,
  title,
  ratings,
  reviewCount,
  imageUrl,
  price,
}: ActivityGridCardProps) {
  return (
    <Link href={`/activities/${id}`} className="group flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-4xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(min-width: 1280px) 204px, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 80vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className="text-yellow">★</span>
          <span>{ratings}</span>
          <span className="text-gray-400">({reviewCount})</span>
        </div>
        <h3 className="line-clamp-1 text-[18px] leading-snug font-semibold text-gray-900">
          {title}
        </h3>

        <span className="text-[20px] font-bold">
          ₩ {price}{" "}
          <span className="text-[16px] font-normal text-gray-700">/ 인</span>
        </span>
      </div>
    </Link>
  );
}
