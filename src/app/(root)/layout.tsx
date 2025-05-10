import Footer from "~/app/_components/Footer";
import Navbar from "~/app/_components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-[#fffbef]">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
