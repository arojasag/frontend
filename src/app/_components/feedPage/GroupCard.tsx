import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Lock } from "lucide-react";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    description?: string; // It can be optional
    profile_pic?: string; // It can be optional
    isVerified?: boolean; // It can be optional
    isOpen?: boolean; // It can be optional
  };
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Link
      href={`/groups/${group.id}`}
      className="flex h-52 flex-col overflow-hidden rounded-2xl bg-white transition hover:shadow-md sm:flex-row"
    >
      <div className="relative h-48 w-full sm:h-full sm:w-[45%]">
        <Image
          src={
            group.profile_pic
              ? `data:image/jpeg;base64,${group.profile_pic}` // Ajusta el tipo de imagen si no es JPEG
              : "/assets/fondo-de-arte-digital-de-japon.jpg" // Imagen por defecto
          }
          alt={group.name || "Group Image"} // Asegúrate de incluir texto alternativo
          layout="fill"
          objectFit="cover"
        />
        {group.isOpen === false && (
          <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow">
            <Lock className="h-4 w-4" /> Cerrado
          </span>
        )}
      </div>
      <div className="flex w-full items-center px-6 sm:w-[55%]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-neutral-900">
              {group.name}
            </h2>
            {group.isVerified && (
              <BadgeCheck className="h-5 w-5 text-sky-500" />
            )}
          </div>
          <p className="line-clamp-4 text-sm text-gray-600">
            {group.description ?? "Sin descripción disponible"}{" "}
            {/* Default description if description is not provided */}
          </p>
        </div>
      </div>
    </Link>
  );
}
