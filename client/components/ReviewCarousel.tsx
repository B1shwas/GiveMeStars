"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import ReviewsCard from "./ReviewsCard";

const ReviewCarousel = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback((emblaApi: CarouselApi | null) => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
    setCount(emblaApi.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!api) return;

    // Add event listener for slide changes
    //@ts-ignore
    api.on("select", onSelect);

    // Initial setup
    //@ts-ignore
    setCount(api.scrollSnapList().length);

    // Clean up
    return () => {
      // @ts-ignore
      api.off("select", onSelect);
    };
  }, [api, onSelect]);
  return (
    <Carousel
      className="m-auto md:w-[80%] mt-10"
      // @ts-ignore
      setApi={setApi}
      opts={{
        align: "end",
      }}
    >
      <CarouselContent>
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <CarouselItem
            key={index}
            className={`md:basis-1/2 lg:basis-1/3 
            `}
          >
            <ReviewsCard />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="hidden sm:flex" />
      <CarouselPrevious className="hidden sm:flex" />
    </Carousel>
  );
};

export default ReviewCarousel;
