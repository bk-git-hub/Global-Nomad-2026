import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ActivityImageCarousel({
  children,
}: {
  children: React.ReactNode[];
}) {
  const hasSubImages = children.length > 1;

  return (
    <Carousel>
      <CarouselContent className="relative m-0 h-77.5 w-full">
        {children}
      </CarouselContent>
      {hasSubImages && (
        <>
          {" "}
          <CarouselPrevious className="absolute top-1/2 left-4 z-10 -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-4 z-10 -translate-y-1/2" />
        </>
      )}
    </Carousel>
  );
}
