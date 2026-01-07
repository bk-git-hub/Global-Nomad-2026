"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PopularActivities({
  children,
}: {
  children: React.ReactNode[];
}) {
  return (
    <section className="flex flex-col gap-4 sm:gap-6">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          loop: false,
        }}
        className="w-full"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold sm:text-[36px]">🔥 인기 체험</h2>

          <div className="relative flex gap-2 sm:gap-4">
            <CarouselPrevious className="static h-10 w-10 translate-y-0 border-gray-300 sm:h-12 sm:w-12" />
            <CarouselNext className="static h-10 w-10 translate-y-0 border-gray-300 sm:h-12 sm:w-12" />
          </div>
        </div>

        <CarouselContent className="mt-4 -ml-4 sm:mt-6">
          {children}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
