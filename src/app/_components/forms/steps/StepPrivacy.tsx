// src/app/(app)/groups/create/steps/StepPrivacy.tsx
"use client";

import { Button } from "~/app/_components/ui/button";
import { Switch } from "~/app/_components/ui/switch";
import { Label } from "~/app/_components/ui/label";

import { type CreateGroupFormData } from "../CreateGroupForm";

type Props = {
  data: CreateGroupFormData;
  onChange: (data: CreateGroupFormData) => void;
  onNext?: () => void;
  onBack?: () => void;
};

export default function StepPrivacy({ data, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Privacidad del grupo</h2>
      <p className="text-muted-foreground mb-2">
        Elige si las personas pueden unirse libremente a tu grupo o si necesitan
        aprobación.
      </p>
      <div className="flex items-center gap-4 py-4">
        <Switch
          id="isOpen"
          checked={data.isOpen}
          onCheckedChange={(val) => onChange({ ...data, isOpen: val })}
        />
        <Label htmlFor="isOpen">
          {data.isOpen ? "Abierto para todos" : "Solo por solicitud"}
        </Label>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack} className="cursor-pointer">
          Anterior
        </Button>
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
