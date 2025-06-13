import Link from "next/link";
import Image from "next/image";
import { Unlock, User, Lock, Users, BadgeCheck } from "lucide-react";
import EventCard from "~/app/_components/feedPage/EventCard";
import { notFound } from "next/navigation";

// Simulation of fetching a group by ID
const getFakeGroup = (id: string) => ({
  id: +id,
  name: "Grupo de Estudiantes UN",
  description:
    "Este es un grupo de ejemplo. \nPuedes cambiar esta descripción cuando cargues datos reales.",
  profile_pic: "/assets/ilustracion-de-la-ciudad-del-anime.jpg",
  isVerified: true,
  isOpen: true,
  categories: ["Educación", "Tecnología"],
  events: [
    {
      id: 1,
      title: "Nombre del Evento de Prueba",
      description:
        "Este es un evento de ejemplo. \nPuedes cambiar esta descripción cuando cargues datos reales.",
      profile_pic: "/assets/ilustracion-de-la-ciudad-del-anime.jpg",
      place: "Auditorio Central, Universidad Nacional",
      starts_at: "2025-06-10T18:00:00",
      ends_at: "2025-06-10T21:00:00",
      group_creator: "Grupo de Estudiantes UN",
      capacity: 100,
    },
    {
      id: 2,
      title: "Nombre del Evento de Prueba",
      description:
        "Este es un evento de ejemplo. \nPuedes cambiar esta descripción cuando cargues datos reales.",
      profile_pic: "/assets/ilustracion-de-la-ciudad-del-anime.jpg",
      place: "Auditorio Central, Universidad Nacional",
      starts_at: "2025-06-10T18:00:00",
      ends_at: "2025-06-10T21:00:00",
      group_creator: "Grupo de Estudiantes UN",
      capacity: 100,
    },
  ],
  num_members: 50,
  creator: {
    id: 123,
    name: "Juan Pérez",
  },
});

const GroupDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  // const event = await api.events.getById.query({ id: params.id }); // Uncomment this line if you have a real API
  const event = getFakeGroup(id);

  if (!event) return notFound();

  // Simulated user data
  // Replace this with your actual user fetching logic
  const user = { id: 123, role: "creator" };

  return (
    <main className="mx-auto flex flex-col items-center bg-gray-50 pb-20">
      {/* Header of the group page and the group image */}
      <div className="mb-6 flex w-full gap-16 border-b bg-white px-[200px] py-4 shadow-xs">
        <div className="flex w-full max-w-2xl flex-col gap-2">
          <Image
            src={event.profile_pic}
            alt={event.name}
            width={800}
            height={400}
            className="mb-4 rounded-xl object-cover shadow"
          />
        </div>
        <div className="ml-auto flex flex-col gap-5 pb-4">
          <h1 className="flex max-w-4xl items-center gap-2 text-4xl font-bold">
            {event.name}
            {event.isVerified && (
              <BadgeCheck className="h-8 w-8 text-sky-500" />
            )}
          </h1>
          <div className="text-md flex flex-col gap-2">
            {/* Number of members */}
            <p className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              {event.num_members ?? 0} miembros
            </p>

            {/* Group type */}
            <p className="flex items-center gap-2">
              {event.isOpen ? (
                <>
                  <Unlock className="h-4 w-4 text-gray-500" />
                  Grupo público
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 text-gray-500" />
                  Grupo privado
                </>
              )}
            </p>

            {/* Group creator */}
            {event.creator && (
              <p className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                Organizado por{" "}
                <span className="font-semibold">{event.creator.name}</span>
              </p>
            )}
          </div>
          <div className="flex-grow" />
          <div className="mt-8 flex w-full">
            {user.role === "creator" ? (
              <Link
                href={`/groups/${event.id}/edit`}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Editar grupo
              </Link>
            ) : (
              <button
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                onClick={() =>
                  alert(
                    event.isOpen
                      ? "Te has unido al grupo"
                      : "Solicitud enviada",
                  )
                }
              >
                {event.isOpen ? "Unirse" : "Solicitar unirse"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:w-[1120px] lg:grid-cols-3">
        {/* Image and description */}
        <div className="max-w-2xl lg:col-span-2">
          <div className="rounded-xl border bg-white p-4">
            <h2 className="mb-4 text-xl font-bold">Descripción</h2>
            <p className="whitespace-pre-line text-gray-700">
              {event.description}
            </p>
          </div>
          {/* List of events of the group */}
          <div className="mt-8 rounded-xl border bg-white p-4">
            <h2 className="mb-4 text-xl font-bold">Eventos del grupo</h2>
            {event.events.length === 0 ? (
              <p className="text-gray-500">Este grupo no tiene eventos aún.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {event.events.map((ev) => (
                  <EventCard key={ev.id} event={ev} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional information */}
        <div className="flex flex-col gap-6">
          {/* Estado del grupo */}
          <aside className="flex flex-col items-center space-y-4 rounded-xl border bg-white p-4">
            <p className="text-sm text-gray-500">Estado</p>
            <p className="text-lg font-bold">
              {event.isOpen ? "Abierto" : "Cerrado"}
            </p>
          </aside>

          {/* Categories */}
          <aside className="space-y-4 rounded-xl border bg-white p-4">
            <p className="text-sm text-gray-500">Categorías</p>
            <div className="flex flex-wrap gap-2">
              {event.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700"
                >
                  {cat}
                </span>
              ))}
            </div>
          </aside>

          {/* Map or image of the group */}
          <aside className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border bg-white p-4">
            <p className="mb-2 text-sm text-gray-500">Imagen del grupo</p>
            <div className="flex h-40 w-full items-center justify-center rounded bg-gray-200">
              <Image
                src={event.profile_pic}
                alt={event.name}
                width={120}
                height={120}
                className="rounded object-cover"
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default GroupDetailPage;
