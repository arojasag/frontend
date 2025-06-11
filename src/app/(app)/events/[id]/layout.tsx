// app/(app)/events/layout.tsx
import Footer from "~/app/_components/landingPage/Footer";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-50">
      <div className="mx-auto">
        <div className="">{children}</div>
      </div>
      <Footer />
    </main>
  );
}
