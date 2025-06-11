"use client";

import { useState } from "react";
// Import some components
import FilterBar from "~/app/_components/feedPage/FilterBar";
import EventsGrid from "~/app/_components/feedPage/EventsGrid";
import GroupsGrid from "~/app/_components/feedPage/GroupsGrid";

// sample data for demonstration purposes
import { sampleEvents, sampleGroups } from "~/constants";

export default function FeedPage() {
  const [view, setView] = useState<"events" | "groups">("events");

  return (
    <>
      <FilterBar view={view} onChange={setView} />
      <main className="mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        {view === "events" ? (
          <EventsGrid events={sampleEvents} />
        ) : (
          <GroupsGrid groups={sampleGroups} />
        )}
      </main>
    </>
  );
}
