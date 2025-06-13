"use client";

import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";

type StepTitleProps<T extends { title: string }> = {
  data: T;
  onChange: (data: T) => void;
  onNext?: () => void;
};

function StepTitle<T extends { title: string }>({
  data,
  onChange,
  onNext,
}: StepTitleProps<T>) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Nombra tu evento</h2>
      <p className="text-muted-foreground mb-2">
        Elige un nombre que le dé a las personas una idea clara de qué trata tu
        evento.
      </p>
      <Input
        placeholder="Ex. Tech MeetUN en Bogotá"
        value={data.title}
        onChange={(e) => onChange({ ...data, title: e.target.value })}
      />

      <div className="mt-6 flex justify-end">
        <Button
          onClick={onNext}
          disabled={data.title.trim().length < 3}
          className="cursor-pointer"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default StepTitle;
