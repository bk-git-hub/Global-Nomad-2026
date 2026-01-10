import Link from "next/link";
import { CarouselItem } from "../../ui/carousel";

interface BannerCardProps {
  imageUrl: string;
  title: string;
  id: string;
}

export default function BannerCard({ imageUrl, title, id }: BannerCardProps) {
  return (
    <CarouselItem className="basis-full p-0">
      <Link
        href={`/activities/${id}`}
        className="flex h-full w-full items-center bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <h2 className="px-6 text-2xl font-bold text-white drop-shadow-lg sm:px-8">
          {title}
        </h2>
      </Link>
    </CarouselItem>
  );
}
