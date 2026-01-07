import { CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";

interface PopularActivityCardProps {
  id: string;
  title: string;
  ratings: number;
  reviewCount: number;
  imageUrl: string;
  price: number;
}

export default function PopularActivityCard({
  id,
  title,
  ratings,
  reviewCount,
  imageUrl,
  price,
}: PopularActivityCardProps) {
  return (
    <CarouselItem className="basis-50 pl-4 sm:basis-55">
      <Link
        href={`/activities/${id}`}
        className="flex aspect-square w-full flex-col justify-center rounded-[24px] bg-center bg-no-repeat p-6 text-white transition-transform hover:scale-[1.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${imageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold">
            <span className="text-yellow">★</span> {ratings} ({reviewCount})
          </span>
          <h2 className="line-clamp-2 text-[18px] leading-tight font-bold drop-shadow-md">
            {title}
          </h2>
          <span className="font-bold">
            ₩ {price} <span className="text-gray-700">/ 인</span>
          </span>
        </div>
      </Link>
    </CarouselItem>
  );
}
