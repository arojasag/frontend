import GroupCard from "~/app/_components/feedPage/GroupCard";

interface GroupsGridProps {
  groups: {
    id: number;
    name: string;
    description: string;
    profile_pic: string;
    isVerified: boolean;
    isOpen: boolean;
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
