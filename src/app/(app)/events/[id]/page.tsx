// src/app/(app)/events/[id]/page.tsx
import { notFound } from "next/navigation";
// import { api } from "~/trpc/server"; // Uncomment this line if you have a real API set up
import Image from "next/image";
import Link from "next/link";

// Uncomment the following line if you have authentication set up
// import { auth } from "@/auth";

// Function to simulate fetching an event by ID
// This is just a placeholder. Replace it with your actual API call.
const getFakeEvent = (id: string) => ({
  id: +id,
  title: "Nombre del Evento de Prueba",
  description: `Este es un evento de prueba para el ID ${id}.\nAgrega una descripción real aquí.`,
  profile_pic: "/assets/ilustracion-de-la-ciudad-del-anime.jpg",
  place: "Auditorio Central, Universidad Nacional",
  starts_at: "2025-06-10T18:00:00",
  ends_at: "2025-06-10T21:00:00",
  capacity: 100,
  user_creator: "Nombre del Creador",
  user_creator_id: 123,
  group_creator: "Grupo de Estudiantes UN",
});

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  // const event = await api.events.getById.query({ id: params.id }); // Uncomment this line if you have a real API
  const event = getFakeEvent(id);

  if (!event) return notFound();

  // Simulated user data
  // Replace this with your actual user fetching logic
  const user = { id: 123, role: "creator" };

  return (
    <main className="mx-auto flex flex-col items-center pb-20">
      <div className="mb-6 flex w-full justify-center border-b bg-white px-4 py-4 shadow-xs">
        <div className="flex w-full max-w-6xl items-center justify-between px-4">
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <p className="text-sm text-gray-500">
              Hosted By{" "}
              <span className="font-semibold">{event.group_creator}</span>
            </p>
          </div>
          <div className="ml-auto flex items-center">
            {user.role === "creator" ? (
              <Link
                href={`/events/${event.id}/edit`}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Editar
              </Link>
            ) : (
              <button
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                onClick={() => alert("Te has registrado como asistente")}
              >
                Asistir
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid w-full max-w-6xl grid-cols-1 gap-6 px-4 lg:grid-cols-3">
        <div className="max-w-2xl lg:col-span-2">
          <Image
            src={event.profile_pic}
            alt={event.title}
            width={800}
            height={400}
            className="mb-4 rounded-xl object-cover shadow"
          />
          <div className="rounded-xl border bg-white p-4">
            <h2 className="mb-4 text-xl font-bold">Detalles</h2>
            <p className="whitespace-pre-line text-gray-700">
              {event.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <aside className="flex flex-col items-center space-y-4 rounded-xl border bg-white p-4">
            <p className="text-sm text-gray-500">Organizado por</p>
            <p className="text-lg font-bold">{event.group_creator}</p>
          </aside>

          <aside className="space-y-4 rounded-xl border bg-white p-4">
            <div>
              <p className="text-sm text-gray-500">📅 Fecha y Hora de Inicio</p>
              <p className="font-medium">
                {new Date(event.starts_at).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">🕒 Fin del evento</p>
              <p className="font-medium">
                {new Date(event.ends_at).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">📍 Lugar</p>
              <p className="font-medium">{event.place}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">👥 Capacidad</p>
              <p className="font-medium">{event.capacity} personas</p>
            </div>
          </aside>

          <aside className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border bg-white p-4">
            <p className="mb-2 text-sm text-gray-500">Mapa del lugar</p>
            <div className="flex h-40 w-full items-center justify-center rounded bg-gray-200">
              <span className="text-gray-400">[Mapa aquí]</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
export default EventDetailPage;
