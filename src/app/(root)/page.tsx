import { HydrateClient } from "~/trpc/server";
import Hero from "../_components/landingPage/Hero";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Hero />
      </main>
    </HydrateClient>
  );
}
