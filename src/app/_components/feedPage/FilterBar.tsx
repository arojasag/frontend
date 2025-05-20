import Link from "next/link";
import { Button } from "../ui/button";

interface FilterBarProps {
  view: "events" | "groups";
  onChange: (view: "events" | "groups") => void;
}

export default function FilterBar({ view, onChange }: FilterBarProps) {
  return (
    <section className="sticky top-16 z-40 border-b-2 border-gray-200 bg-white px-14 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {view === "events" ? "Eventos" : "Grupos"}
        </h1>

        <div className="flex items-center space-x-4">
          <div className="space-x-2">
            <Button
              onClick={() => onChange("events")}
              variant={view === "events" ? "default" : "outline"}
              className="cursor-pointer"
            >
              Eventos
            </Button>
            <Button
              onClick={() => onChange("groups")}
              variant={view === "groups" ? "default" : "outline"}
              className="cursor-pointer"
            >
              Grupos
            </Button>
          </div>

          <Button className="bg-amber-600 hover:bg-amber-500" asChild>
            <Link
              href={view === "events" ? "/events/create" : "/groups/create"}
            >
              {view === "events" ? "Crear Evento" : "Crear Grupo"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
