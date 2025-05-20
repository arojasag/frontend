"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";

const Header = () => {
  const handleSignOut = async () => {
    // Logic to handle sign out
    // This could involve clearing tokens, redirecting to a sign-in page, etc.
    alert("Cerrar sesión");
  };

  return (
    <nav className="header border-gray sticky border-b">
      <Link href="/feed">
        <Image src="/assets/meetUN.svg" width={150} height={100} alt="Logo" />
      </Link>
      <div className="flex items-center space-x-4">
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
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="#">Mi Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-[#e32424]"
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Header;
