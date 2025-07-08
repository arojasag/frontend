import { HydrateClient } from "~/trpc/server";
import Hero from "../_components/landingPage/Hero";
import os from "os";

export const dynamic = "force-dynamic"

export default async function Home() {
  const hostname = os.hostname();

  return (
    <HydrateClient>
      <h2 style={{ color: "gray", fontSize: "14px" }}>
        Servido por: {hostname}
      </h2>
      <main>
        <Hero />
      </main>
    </HydrateClient>
  );
}
