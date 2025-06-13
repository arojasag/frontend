"use client";

import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";

type StepLocationProps<T extends { place: string }> = {
  data: T;
  onChange: (data: T) => void;
  onNext?: () => void;
  onBack?: () => void;
};

function StepLocation<T extends { place: string }>({
  data,
  onChange,
  onNext,
  onBack,
}: StepLocationProps<T>) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Ubicación del evento</h2>
      <p className="text-muted-foreground mb-2">
        Indica el lugar donde se realizará el evento o reunión. Puedes incluir
        ciudad y lugar específico.
      </p>
      <Input
        placeholder="Ej. Estadio Alfonso López Pumarejo, Bogotá"
        value={data.place}
        onChange={(e) => onChange({ ...data, place: e.target.value })}
      />

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack} className="cursor-pointer">
          Anterior
        </Button>
        <Button
          onClick={onNext}
          disabled={data.place.trim().length < 3}
          className="cursor-pointer"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default StepLocation;
