import GroupCard from "~/app/_components/feedPage/GroupCard";

interface GroupsGridProps {
  groups: {
    id: string;
    name: string;
    description?: string; // It can be optional
    profile_pic?: string; // It can be optional
    isVerified?: boolean; // It can be optional
    isOpen?: boolean; // It can be optional
  }[];
}

export default function GroupsGrid({ groups }: GroupsGridProps) {
  return (
    <section className="grid grid-cols-1 gap-6 p-6 xl:grid-cols-2">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </section>
  );
}
