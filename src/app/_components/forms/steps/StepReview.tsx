// src/app/(app)/groups/create/steps/StepReview.tsx
"use client";

import { Button } from "~/app/_components/ui/button";
import Image from "next/image";
import { type CreateGroupFormData } from "../CreateGroupForm";

interface Props {
  data: CreateGroupFormData;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepReview({ data, onBack, onSubmit }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Revisa tu grupo</h2>
      <p className="text-muted-foreground mb-4">
        Verifica los detalles antes de enviar.
      </p>

      <div className="space-y-4">
        <div>
          <strong>Nombre:</strong> {data.name}
        </div>
        {data.description && (
          <div>
            <strong>Descripción:</strong> {data.description}
          </div>
        )}
        {/* <div>
          <strong>Categorías:</strong> {data.categories.join(", ")}
        </div> */}
        <div>
          <strong>Privacidad:</strong>{" "}
          {data.isOpen ? "Abierto" : "Solicitud para unirse"}
        </div>
        {data.profile_pic && (
          <div>
            <strong>Imagen:</strong>
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(data.profile_pic)}
                alt="Vista previa"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack} className="cursor-pointer">
          Anterior
        </Button>
        <Button onClick={onSubmit} className="cursor-pointer">
          Crear grupo
        </Button>
      </div>
    </div>
  );
}
