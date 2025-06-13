// app/(app)/groups/[id]/layout.tsx
import Footer from "~/app/_components/landingPage/Footer";

export default function GroupsLayout({
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
