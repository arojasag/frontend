import Link from "next/link";
import EditEventForm from "~/app/_components/forms/EditEventForm";
// import { api } from "~/app/_trpc/api"; // Uncomment this line if you have a real API

// This is a mock function to simulate fetching an event by ID,
// if you want to change this you can also use by name, it can be useful and clean.
const getFakeEvent = (id: string) => ({
  id: id,
  title: "Nombre del Evento de Prueba",
  description: `Este es un evento de prueba para el ID ${id}.\nAgrega una descripción real aquí.`,
  place: "Auditorio Central, Universidad Nacional",
  starts_at: "2025-06-10T18:00:00",
  ends_at: "2025-06-10T21:00:00",
  capacity: 100,
});

const EventEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  // const event = await api.events.getById.query({ id: params.id }); // Uncomment this line if you have a real API
  const event = getFakeEvent(id);

  // const handleDelete = async () => {
  //   // Implement your delete logic here, e.g., calling an API to delete the event
  // };

  // If the event is not found, you can handle it here

  if (!event)
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">Evento no encontrado</div>
    );
  if (event.id !== id)
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">Evento no encontrado</div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link
        href={`/events/${event.id}`}
        className="text-muted-foreground mb-4 cursor-pointer text-sm"
      >
        &larr; Regresar al evento
      </Link>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editar Evento</h1>
        <button
          type="button"
          className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          // onClick={handleDelete} // Implement your delete logic here
        >
          Eliminar evento
        </button>
      </div>
      <EditEventForm initialData={event} />
    </div>
  );
};

export default EventEditPage;
