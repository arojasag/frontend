"use client";

import { Button } from "~/app/_components/ui/button";
import { Label } from "~/app/_components/ui/label";
import { type CreateEventFormData } from "../CreateEventForm"; // adjust import path if needed

type Props = {
  data: CreateEventFormData;
  onChange: (data: CreateEventFormData) => void;
  onNext?: () => void;
  onBack?: () => void;
};

export default function StepDateTime({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const isValid =
    data.starts_at &&
    data.ends_at &&
    new Date(data.ends_at) > new Date(data.starts_at);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Selecciona fecha y hora del evento
      </h2>
      <p className="text-muted-foreground mb-4">
        Elige cuándo comienza y termina tu evento.
      </p>

      <div className="flex max-w-md flex-col gap-4">
        <div>
          <Label htmlFor="startDate">Fecha y hora de inicio</Label>
          <input
            id="startDate"
            type="datetime-local"
            value={data.starts_at}
            onChange={(e) => onChange({ ...data, starts_at: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <Label htmlFor="endDate">Fecha y hora de finalización</Label>
          <input
            id="endDate"
            type="datetime-local"
            value={data.ends_at}
            onChange={(e) => onChange({ ...data, ends_at: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {!isValid && (
        <p className="mt-2 text-sm text-red-600">
          Por favor, ingresa fechas válidas. La fecha de finalización debe ser
          posterior a la de inicio.
        </p>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack} className="cursor-pointer">
          Anterior
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="cursor-pointer">
          Siguiente
        </Button>
      </div>
    </div>
  );
}
