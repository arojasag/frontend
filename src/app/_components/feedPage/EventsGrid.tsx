// feed/components/EventsGrid.tsx
import EventCard from "~/app/_components/feedPage/EventCard";

interface EventsGridProps {
  events: {
    id: number;
    title: string;
    description: string;
    image: string;
    place: string;
    starts_at: string;
    ends_at: string;
    capacity: number;
    // user_creator_id: number;
    // group_creator_id: number;
  }[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  return (
    <section className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
