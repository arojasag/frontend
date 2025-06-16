import FilterBar from "~/app/_components/feedPage/FilterBar";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [view, setView] = useState<"events" | "groups">("events");

  return (
    <>
      <FilterBar />
      <main className="mx-auto">{children}</main>
    </>
  );
}
