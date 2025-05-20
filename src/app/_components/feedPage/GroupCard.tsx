import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Lock } from "lucide-react";

interface GroupCardProps {
  group: {
    id: number;
    name: string;
    description: string;
    profile_pic: string;
    isVerified: boolean;
    isOpen: boolean;
  };
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Link
      href={`/groups/${group.id}`}
      className="flex h-52 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row"
    >
      <div className="relative h-48 w-full sm:h-full sm:w-[45%]">
        <Image
          src={group.profile_pic}
          alt={group.name}
          fill
          className="object-cover"
        />
        {!group.isOpen && (
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
            {group.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
