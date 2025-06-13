// src/app/_components/feedPage/EventCard.tsx
import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    description: string;
    profile_pic: string;
    place: string;
    starts_at: string;
    ends_at: string;
    capacity: number;
    // user_creator_id: number;
    // group_creator_id: number;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.starts_at).toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      href={`/events/${event.id}`}
      className="group relative block overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 px-4 py-4 opacity-0 transition duration-300 group-hover:opacity-100">
        <p
          className="line-clamp-[8] overflow-hidden text-start text-sm font-semibold break-words text-white"
          style={{
            display: "-webkit-box",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {event.description}
        </p>
      </div>
      <div className="relative">
        <Image
          src={event.profile_pic}
          alt={event.title}
          width={500}
          height={240}
          className="h-48 w-full rounded-lg object-cover transition duration-300 group-hover:brightness-75"
          priority
        />
      </div>
      <div className="space-y-1 py-4">
        <p className="text-xs text-gray-500">📅 {date}</p>
        <h2 className="truncate text-base font-semibold text-neutral-900">
          {event.title}
        </h2>
        <p className="text-sm text-gray-700">{event.place}</p>
      </div>
    </Link>
  );
}
