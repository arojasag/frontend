"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Define the type for each hero item
// This should match the structure of the items you pass to the HeroCarousel component
type HeroItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

type HeroCarouselProps = {
  items: HeroItem[];
};

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const currentItem: HeroItem | undefined = items[currentIndex];

  if (!currentItem) {
    return null;
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-lg select-none">
      {/* Actual slide */}
      <Image
        src={currentItem.imageUrl}
        alt={currentItem.title}
        fill
        className="object-cover brightness-90"
        sizes="100vw"
        priority
      />

      {/* Degradating overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/80 to-transparent"></div>

      {/* Slide content */}
      <div className="absolute top-0 bottom-0 left-16 flex w-1/3 flex-col justify-center space-y-4 p-8 text-white">
        <h1 className="text-4xl font-bold drop-shadow-md">
          {currentItem.title}
        </h1>
        <p className="text-base text-white drop-shadow-md">
          {currentItem.description}
        </p>
        <div className="flex">
          <Link
            href={`/events/${currentItem.id}`}
            className="rounded-3xl bg-orange-600 px-6 py-2 font-semibold text-black shadow-lg transition-colors hover:bg-orange-700"
          >
            Más Información
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronRight size={28} />
      </button>

      {/* indicators, small dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${
              index === currentIndex
                ? "bg-orange-600"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
