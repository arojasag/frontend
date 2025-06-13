"use client";
import { useRef, useState, useEffect } from "react";
import EventCard from "~/app/_components/feedPage/EventCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollListProps {
  title: string;
  events: Array<{
    id: number;
    title: string;
    description: string;
    profile_pic: string;
    place: string;
    starts_at: string;
    ends_at: string;
    capacity: number;
  }>;
}

export default function HorizontalScrollList({
  title,
  events,
}: HorizontalScrollListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Initialize scroll buttons visibility
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <section className="relative space-y-3">
      <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
      <div className="relative">
        {/* Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-400)}
            className="absolute top-1/2 left-0 z-20 h-full -translate-y-1/2 cursor-pointer rounded-r-3xl bg-black/20 p-1 text-white transition hover:bg-black/40"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Scrolleable Container */}
        <div
          ref={scrollRef}
          className="no-scrollbar relative flex space-x-4 overflow-x-auto scroll-smooth px-8 whitespace-nowrap"
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="scroll-snap-start inline-block w-[400px] flex-shrink-0"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll(400)}
            className="absolute top-1/2 right-0 z-10 h-full -translate-y-1/2 cursor-pointer rounded-l-3xl bg-black/20 p-1 text-white transition hover:bg-black/40"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>
    </section>
  );
}
