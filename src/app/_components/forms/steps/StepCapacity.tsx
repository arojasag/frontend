"use client";

import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { type CreateEventFormData } from "../CreateEventForm";

type Props = {
  data: CreateEventFormData;
  onChange: (data: CreateEventFormData) => void;
  onNext?: () => void;
  onBack?: () => void;
};

export default function StepCapacity({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      onChange({ ...data, capacity: value });
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Establecer capacidad del evento (opcional)
      </h2>
      <p className="text-muted-foreground mb-2">
        ¿Cuántas personas pueden asistir? Deja en blanco si es ilimitado.
      </p>
      <Label htmlFor="capacity" className="mb-2">
        Capacidad
      </Label>
      <Input
        id="capacity"
        type="text"
        placeholder="ej. 100"
        value={data.capacity ?? ""}
        onChange={handleCapacityChange}
        maxLength={6}
      />

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack} className="cursor-pointer">
          Anterior
        </Button>
        <Button onClick={onNext} className="cursor-pointer">
          Siguiente
        </Button>
      </div>
    </div>
  );
}
