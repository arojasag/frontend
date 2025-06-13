// app/(app)/layout.tsx

import Header from "../_components/Header";

// import { redirect } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  //   const isLoggedIn = true; // Real logic to check if the user is logged in

  //   if (!isLoggedIn) redirect("/sign-in");

  return (
    <main>
      <div className="mx-auto">
        <Header />

        <div className="bg-white">{children}</div>
      </div>
    </main>
  );
}
