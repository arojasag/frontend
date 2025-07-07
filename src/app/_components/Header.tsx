"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
// import { signOut } from "next-auth/react"; // Adjust the import based on your auth setup
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

// Dentro de tu componente Header

const Header = () => {
  const router = useRouter();
  const logout = api.auth.logout.useMutation();
  return (
    <nav className="header sticky border-b">
      <Link href="/feed">
        <Image src="/assets/meetUN.svg" width={150} height={100} alt="Logo" />
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/my-events"
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-calendar object-contain"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span className="hidden sm:inline">Tus eventos</span>
        </Link>
        <Link
          href="/my-groups"
          className="flex items-center space-x-1 hover:text-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-users object-contain"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="hidden sm:inline">Tus grupos</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer outline-none">
            <div className="flex items-center">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src="/assets/picture-icon.svg"
                  width={50}
                  height={50}
                  alt="Profile picture"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="ml-2 text-gray-400 hover:text-gray-600">
                Nombre
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/my-groups">Mis grupos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/my-events">Mis eventos</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/members/1">Mi Perfil</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              asChild
              className="mt-1 w-full cursor-pointer text-[#e32424]"
            >
              <button
                onClick={() => {
                  logout.mutate(undefined, {
                    onSuccess: () => {
                      router.replace("/sign-in");
                    },
                    onError: (err) => {
                      console.error("Error al cerrar sesión:", err);
                    },
                  });
                }}
              >
                Cerrar sesión
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Header;
