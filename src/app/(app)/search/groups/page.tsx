// app/search/groups/page.tsx
// import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import GroupsGrid from "~/app/_components/feedPage/GroupsGrid";

export default async function GroupsPage() {
  // const session = await getServerAuthSession();

  // // Puedes restringir acceso si lo deseas
  // if (!session) {
  //   return (
  //     <main className="p-10 text-center text-xl">
  //       Debes iniciar sesión para ver tus grupos.
  //     </main>
  //   );
  // }

  const data = await api.groups.getGroups();
  console.log("Data from getGroups:", data);

  const groups =
    data.groups?.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description || "Sin descripción disponible",
      profile_pic:
        group.profilePic?.data || "/assets/fondo-de-arte-digital-de-japon.jpg", // Default image
      isVerified: group.isVerified ?? false,
      isOpen: group.isOpen ?? true,
    })) ?? [];

  return (
    <main className="mx-auto">
      {groups.length === 0 ? (
        <div className="mt-8 text-lg text-gray-600">No hay grupos.</div>
      ) : (
        <GroupsGrid groups={groups} />
      )}
    </main>
  );
}
