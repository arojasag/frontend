// src/app/(app)/groups/create/steps/StepName.tsx
"use client";

import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";

type StepNameProps<T extends { name: string }> = {
  data: T;
  onChange: (data: T) => void;
  onNext?: () => void;
  onBack?: () => void;
};

function StepName<T extends { name: string }>({
  data,
  onChange,
  onNext,
  // onBack,
}: StepNameProps<T>) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Nombra tu grupo</h2>
      <p className="text-muted-foreground mb-2">
        Elige un nombre que le dé a las personas una idea clara de qué trata tu
        grupo.
      </p>
      <Input
        placeholder="Ex. Grupo de Tech MeetUN en Bogotá"
        value={data.name}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
      />

      <div className="mt-6 flex justify-end">
        {/* <Button variant="outline" onClick={onBack} className="cursor-pointer">
          Anterior
        </Button> */}
        <Button
          onClick={onNext}
          disabled={data.name.trim().length < 3}
          className="cursor-pointer"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default StepName;
