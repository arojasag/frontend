"use client";

import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import Image from "next/image";

type StepImageProps<T extends { profile_pic: File | null }> = {
  data: T;
  onChange: (data: T) => void;
  onNext?: () => void;
  onBack?: () => void;
  entityName: string;
};

export default function StepImage<T extends { profile_pic: File | null }>({
  data,
  onChange,
  onNext,
  onBack,
  entityName,
}: StepImageProps<T>) {
  const preview = data.profile_pic
    ? URL.createObjectURL(data.profile_pic)
    : null;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Sube una imagen para tu {entityName === "grupo" ? "grupo" : "evento"}
      </h2>
      <p className="text-muted-foreground mb-2">
        {entityName === "grupo"
          ? "Elige una foto que represente a tu grupo. Opcional pero recomendado."
          : "Elige una foto que represente a tu evento. Opcional pero recomendado."}
      </p>

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          onChange({ ...data, profile_pic: file ?? null });
        }}
        className="cursor-pointer"
      />

      {preview && (
        <div className="mt-4">
          <Image
            src={preview}
            alt="Group Preview"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack} className="cursor-pointer">
          Anterior
        </Button>
        <Button onClick={onNext} className="cursor-pointer">
          Ver resumen
        </Button>
      </div>
    </div>
  );
}
