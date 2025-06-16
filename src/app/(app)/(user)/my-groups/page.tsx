// app/my-groups/page.tsx
import Link from "next/link";
import Image from "next/image";
import Footer from "~/app/_components/landingPage/Footer";
// import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function MyGroupsPage() {
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
    <>
      <main className="container mx-auto mb-15 max-w-6xl px-4 py-8">
        <Link
          href="/feed"
          className="flex items-center text-gray-600 hover:text-black"
        >
          <span className="mr-2">←</span> Regresar al Feed
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Tus Grupos</h1>

        {groups.length === 0 ? (
          <div className="mt-8 text-lg text-gray-600">
            No estás en ningún grupo.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Link
                href={`/groups/${group.id}`}
                key={group.id}
                className="overflow-hidden rounded-lg border shadow-sm"
              >
                <Image
                  src={
                    group.profile_pic
                      ? `data:image/jpeg;base64,${group.profile_pic}` // Ajusta el tipo de imagen si no es JPEG
                      : "/assets/fondo-de-arte-digital-de-japon.jpg" // Imagen por defecto
                  }
                  alt={group.name || "Group Image"} // Asegúrate de incluir texto alternativo
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
