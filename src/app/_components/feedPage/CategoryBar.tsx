import Link from "next/link";

interface CategoryBarProps {
  categories: Array<{
    id: number;
    name: string;
    icon: React.ElementType;
    href: string;
  }>;
}

export default function CategoryBar({ categories }: CategoryBarProps) {
  return (
    <div className="no-scrollbar flex justify-around space-x-4 overflow-x-auto px-4 py-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="flex flex-col items-center text-gray-600 transition hover:text-black"
        >
          <category.icon className="h-6 w-6" />

          <span className="text-sm">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
