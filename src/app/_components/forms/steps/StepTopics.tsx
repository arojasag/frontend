"use client";

import { Button } from "~/app/_components/ui/button";
import { Badge } from "~/app/_components/ui/badge";
import { type CreateGroupFormData } from "../CreateGroupForm";

type Props = {
  data: CreateGroupFormData;
  onChange: (data: CreateGroupFormData) => void;
  onNext?: () => void;
};

const allCategories = [
  "Comunidad",
  "Ciclismo",
  "Juegos de mesa",
  "Arte",
  "Tecnología",
  "Tenis",
  // Can add more categories here
];

export default function StepTopics({ data, onChange, onNext }: Props) {
  const toggleCategory = (cat: string) => {
    const newCategories = data.categories.includes(cat)
      ? data.categories.filter((c: string) => c !== cat)
      : [...data.categories, cat];
    onChange({ ...data, categories: newCategories });
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Elige temas para tu grupo</h2>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <Badge
            key={cat}
            variant={data.categories.includes(cat) ? "default" : "outline"}
            onClick={() => toggleCategory(cat)}
            className="cursor-pointer"
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={onNext}
          disabled={data.categories.length < 1}
          className="cursor-pointer"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
