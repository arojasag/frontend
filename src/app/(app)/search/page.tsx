import GroupsGrid from "~/app/_components/feedPage/GroupsGrid";
import EventsGrid from "~/app/_components/feedPage/EventsGrid";
import { api } from "~/trpc/server";
import { sampleEvents } from "~/constants";

// Define types for group and event data
type GroupData = {
  id: string;
  name: string;
  description: string;
  profile_pic: string;
  isVerified: boolean;
  isOpen: boolean;
};

// type EventData = {
//   id: string;
//   name: string;
//   description: string;
//   date: string;
//   location: string;
//   image: string;
// };

async function fetchData(source: string) {
  if (source === "groups") {
    const data = await api.groups.getGroups();
    return (
      data.groups?.map((group) => ({
        id: group.id,
        name: group.name,
        description: group.description || "Sin descripción disponible",
        profile_pic:
          group.profilePic?.data || "/assets/default-group-image.jpg", // Default image
        isVerified: group.isVerified ?? false,
        isOpen: group.isOpen ?? true,
      })) ?? []
    );
  } else if (source === "events") {
    // Assuming sampleEvents is an array of event objects
    // Map sampleEvents to the expected format
    // If you have a real API, replace this with an actual fetch call
    // const data = await api.events.getEvents();
    return (
      sampleEvents.map((event) => ({
        id: String(event.id),
        name: event.title,
        description: event.description || "Sin descripción disponible",
        date: event.starts_at,
        location: event.place || "Ubicación no especificada",
        image: event.profile_pic || "/assets/default-event-image.jpg", // Default image
      })) || []
    );
  }
  return [];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source } = await searchParams;

  let groupData: GroupData[] = [];
  let eventData: {
    id: number;
    title: string;
    description: string;
    profile_pic: string;
    place: string;
    starts_at: string;
    ends_at: string;
    capacity: number;
  }[] = [];

  if (source === "groups") {
    groupData = (await fetchData(source)) as GroupData[];
  } else if (source === "events") {
    // Map sampleEvents to the expected EventsGridProps type
    eventData = sampleEvents.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description || "Sin descripción disponible",
      profile_pic: event.profile_pic || "/assets/default-event-image.jpg",
      place: event.place || "Ubicación no especificada",
      starts_at: event.starts_at,
      ends_at: event.ends_at,
      capacity: event.capacity,
    }));
  }

  return (
    <div>
      {source === "groups" && <GroupsGrid groups={groupData} />}
      {source === "events" && <EventsGrid events={eventData} />}
      {!source && <p>Selecciona un filtro para ver resultados.</p>}
    </div>
  );
}
