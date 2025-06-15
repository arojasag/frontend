"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import FilterBar from "~/app/_components/feedPage/FilterBar";
import EventsGrid from "~/app/_components/feedPage/EventsGrid";
import GroupsGrid from "~/app/_components/feedPage/GroupsGrid";
import { sampleEvents } from "~/constants";

export default function FeedPage() {
  const [view, setView] = useState<"events" | "groups">("events");

  const {
    data: groupsData,
    error: groupsError,
    isLoading: groupsIsLoading,
  } = api.groups.getGroups.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const groups =
    groupsData?.groups?.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description || "Sin descripción disponible",
      profile_pic:
        // group.profilePic?.data ??
        "/assets/fondo-de-arte-digital-de-japon.jpg",
      isVerified: group.isVerified ?? false,
      isOpen: group.isOpen ?? true,
    })) ?? [];

  return (
    <>
      <FilterBar view={view} onChange={setView} />
      <main className="mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        {view === "events" ? (
          <EventsGrid events={sampleEvents} /> // Ajusta esto según tus datos de eventos
        ) : groupsIsLoading ? (
          <p>Cargando grupos...</p>
        ) : groupsError ? (
          <p>Error al cargar los grupos</p>
        ) : (
          <GroupsGrid groups={groups} />
        )}
      </main>
    </>
  );
}
