"use client";

import { Carousel, CarouselContent } from "../../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Banner({ children }: { children: React.ReactNode[] }) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="m-0 h-60 w-full">{children}</CarouselContent>
    </Carousel>
  );
}
