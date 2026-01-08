import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

interface ActivityImageCardProps {
  imageUrl: string;
  alt: string;
}

export default function ActivityImageCard({
  imageUrl,
  alt,
}: ActivityImageCardProps) {
  return (
    <CarouselItem className="basis-full p-0">
      <div className="relative h-full w-full">
        <Image src={imageUrl} alt={alt} fill objectFit="contain" />
      </div>
    </CarouselItem>
  );
}
