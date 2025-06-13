import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "~/app/_components/landingPage/Footer";

interface Group {
  id: number;
  name: string;
  image: string;
}

const memberGroups: Group[] = [
  {
    id: 1,
    name: "Bogotá Meditation Meetup",
    image: "/assets/universidad-nacional-de-colombia-banner.jpg",
  },
  {
    id: 2,
    name: "Fútbol Casual Bogotá / Pickup",
    image: "/assets/fondo-de-arte-digital-de-japon.jpg",
  },
];

const creatorGroups: Group[] = [
  {
    id: 3,
    name: "React Developers Bogotá",
    image: "/assets/fondo-de-arte-digital-de-japon (1).jpg",
  },
];

const MyGroupsPage = () => {
  const hasGroups = memberGroups.length > 0 || creatorGroups.length > 0;

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

        {!hasGroups && (
          <div className="mt-8 text-lg text-gray-600">
            No estás en ningún grupo.
          </div>
        )}

        {creatorGroups.length > 0 && (
          <>
            <h2 className="mt-6 text-xl font-semibold">Creador</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {creatorGroups.map((group) => (
                <Link
                  href={`/groups/${group.id}`}
                  key={group.id}
                  className="overflow-hidden rounded-lg border shadow-sm"
                >
                  <Image
                    src={group.image}
                    alt={group.name}
                    width={400}
                    height={160}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {memberGroups.length > 0 && (
          <>
            <h2 className="mt-6 text-xl font-semibold">Miembro</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {memberGroups.map((group) => (
                <Link
                  href={`/groups/${group.id}`}
                  key={group.id}
                  className="overflow-hidden rounded-lg border shadow-sm"
                >
                  <Image
                    src={group.image}
                    alt={group.name}
                    width={400}
                    height={160}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MyGroupsPage;
