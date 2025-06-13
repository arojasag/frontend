// src/app/(app)/groups/create/steps/StepDescription.tsx
"use client";

import { Button } from "~/app/_components/ui/button";
import { Textarea } from "~/app/_components/ui/textarea";

type StepDescriptionProps<T extends { description: string }> = {
  data: T;
  onChange: (data: T) => void;
  onNext?: () => void;
  onBack?: () => void;
  entityName: string;
};

export default function StepDescription<T extends { description: string }>({
  data,
  onChange,
  onNext,
  onBack,
  entityName,
}: StepDescriptionProps<T>) {
  const minLength = 50;
  const currentLength = data.description.trim().length;
  const isValid = currentLength >= minLength;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Describe tu {entityName}</h2>
      <p className="text-muted-foreground mb-2">
        {entityName.toLowerCase() === "grupo"
          ? "Las personas verán esta descripción cuando promocionemos tu grupo. Podrás actualizarla más adelante."
          : entityName.toLowerCase() === "evento"
            ? "Las personas verán esta descripción cuando promocionemos tu evento. Podrás actualizarla más adelante."
            : "Las personas verán esta descripción cuando promocionemos tu entidad. Podrás actualizarla más adelante."}
      </p>
      <Textarea
        placeholder={
          entityName.toLowerCase() === "grupo"
            ? "Ex. Nos reunimos cada semana para hablar sobre tendencias tecnológicas, programar y hacer networking con desarrolladores."
            : entityName.toLowerCase() === "evento"
              ? "Ex.Únete a nuestro evento para aprender, compartir y conectar con otros entusiastas."
              : "Describe aquí tu entidad."
        }
        rows={6}
        value={data.description}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
      />
      <div className="mt-1 flex items-center justify-between">
        <span
          className={`text-sm ${isValid ? "text-muted-foreground" : "text-destructive"}`}
        >
          Mínimo {minLength} caracteres
        </span>
        <span
          className={`text-xs ${isValid ? "text-muted-foreground" : "text-destructive"}`}
        >
          {currentLength}/{minLength}
        </span>
      </div>
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
