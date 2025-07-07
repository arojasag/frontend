// app/(app)/layout.tsx

import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Header from "../_components/Header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await api.auth.getSession();

  console.log("✅ SSR session from tRPC:", session);

  if (!session) redirect("/sign-in");

  return (
    <main>
      <div className="mx-auto">
        <Header />
        <div className="bg-white">{children}</div>
      </div>
    </main>
  );
}
