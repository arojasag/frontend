"use client";

import { useRef } from "react";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import Image from "next/image";
import { useState } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = data.profile_pic
    ? URL.createObjectURL(data.profile_pic)
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen debe pesar menos de 5 MB.");
        onChange({ ...data, profile_pic: null });
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      setError(null);
      onChange({ ...data, profile_pic: file });
    } else {
      setError(null);
      onChange({ ...data, profile_pic: null });
    }
  };

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
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

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
