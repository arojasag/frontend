import Link from "next/link";
import Footer from "~/app/_components/landingPage/Footer";
import { Card, CardContent } from "~/app/_components/ui/card";
import { Calendar } from "~/app/_components/ui/calendar";
import { CalendarDays } from "lucide-react";
import EventCard from "~/app/_components/feedPage/EventCard";

interface Event {
  id: number;
  title: string;
  description: string;
  profile_pic: string;
  place: string;
  starts_at: string;
  ends_at: string;
  capacity: number;
}

// Mock data for demonstration purposes
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Evento de prueba 1",
    description: "Descripción del evento 1",
    profile_pic: "/assets/fondo-de-arte-digital-de-japon.jpg",
    place: "Lugar 1",
    starts_at: new Date().toISOString(),
    ends_at: new Date().toISOString(),
    capacity: 100,
  },
  {
    id: 2,
    title: "Evento de prueba 2",
    description: "Descripción del evento 2",
    profile_pic: "/assets/universidad-nacional-de-colombia-banner.jpg",
    place: "Lugar 2",
    starts_at: new Date().toISOString(),
    ends_at: new Date().toISOString(),
    capacity: 50,
  },
];

export default async function YourEventsPage() {
  // Simulating fetching events from a database or API
  const events = mockEvents;

  return (
    <>
      <div className="mx-auto max-w-6xl p-6 md:p-10">
        <Link
          href="/feed"
          className="text-muted-foreground mb-4 cursor-pointer text-sm"
        >
          &larr; Regresar al feed
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Tus eventos</h1>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Sidebar */}
          <div className="">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-border divide-y rounded-md border">
                  {["Asistiendo", "Organizando", "Pasados"].map(
                    (label, idx) => (
                      <li
                        key={label}
                        className={`hover:bg-muted cursor-pointer px-4 py-3 text-sm ${
                          idx === 0 ? "text-primary bg-muted font-medium" : ""
                        }`}
                      >
                        {label}
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Calendar */}
            <div className="mt-6 rounded-md border p-4">
              <Calendar mode="single" className="rounded-md border" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <CalendarDays className="text-muted h-16 w-16" />
                <p className="text-muted-foreground text-sm">
                  No te has registrado en ningún evento
                </p>
                <Link href="/search" className="text-primary text-sm underline">
                  Descubre nuevos eventos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
