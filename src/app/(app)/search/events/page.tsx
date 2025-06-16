// app/search/groups/page.tsx
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
import EventsGrid from "~/app/_components/feedPage/EventsGrid";
import { sampleEvents } from "~/constants";

export default async function EventsPage() {
  // const session = await getServerAuthSession();

  // // Puedes restringir acceso si lo deseas
  // if (!session) {
  //   return (
  //     <main className="p-10 text-center text-xl">
  //       Debes iniciar sesión para ver tus grupos.
  //     </main>
  //   );
  // }

  return (
    <main className="mx-auto">
      {sampleEvents.length === 0 ? (
        <div className="mt-8 text-lg text-gray-600">No hay grupos.</div>
      ) : (
        <EventsGrid events={sampleEvents} />
      )}
    </main>
  );
}
