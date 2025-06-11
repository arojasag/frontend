import Link from "next/link";
import EditGroupForm from "~/app/_components/forms/EditGroupForm";
// import { api } from "~/app/_trpc/api"; // Uncomment this line if you have a real API

// This is a mock function to simulate fetching an group by ID,
// if you want to change this you can also use by name, it can be useful and clean.
const getFakeGroup = (id: string) => ({
  id: id,
  name: "Grupo de Estudiantes UN",
  description:
    "Este es un grupo de ejemplo. \nPuedes cambiar esta descripción cuando cargues datos reales.",
  isOpen: true,
  categories: ["Educación", "Tecnología"],
});

const GroupEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  // const group = await api.groups.getById.query({ id: params.id }); // Uncomment this line if you have a real API
  const group = getFakeGroup(id);

  // const handleDelete = async () => {
  //   // Implement your delete logic here, e.g., calling an API to delete the group
  // };

  // If the group is not found, you can handle it here

  if (!group)
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">Grupo no encontrado</div>
    );
  if (group.id !== id)
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">Grupo no encontrado</div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link
        href={`/groups/${group.id}`}
        className="text-muted-foreground mb-4 cursor-pointer text-sm"
      >
        &larr; Regresar al grupo
      </Link>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editar grupo</h1>
        <button
          type="button"
          className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          // onClick={handleDelete} // Implement your delete logic here
        >
          Eliminar grupo
        </button>
      </div>
      <EditGroupForm initialData={group} />
    </div>
  );
};

export default GroupEditPage;
