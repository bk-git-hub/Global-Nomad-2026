import Image from "next/image";
import Link from "next/link";

interface ActivityGridCardProps {
  id: string; // id 추가
  title: string;
  ratings: number;
  reviewCount: number;
  imageUrl: string;
}

export default function ActivityGridCard({
  id,
  title,
  ratings,
  reviewCount,
  imageUrl,
}: ActivityGridCardProps) {
  return (
    <Link href={`/activities/${id}`} className="group flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-4xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className="text-nomad-black">★</span>
          <span>{ratings}</span>
          <span className="text-gray-400">({reviewCount})</span>
        </div>
        <h3 className="line-clamp-2 text-[18px] leading-snug font-semibold text-gray-900">
          {title}
        </h3>
      </div>
    </Link>
  );
}
