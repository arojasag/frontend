"use client";

import { useState } from "react";
import Link from "next/link"; // Importa Link si usas Next.js
// import StepTopics from "./steps/StepTopics";
import StepName from "./steps/StepName";
import StepDescription from "./steps/StepDescription";
import StepPrivacy from "./steps/StepPrivacy";
import StepImage from "./steps/StepImage";
import StepReview from "./steps/StepReview";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation"; // Import useRouter to navigate

export type CreateGroupFormData = {
  name: string;
  description: string;
  // categories: string[];
  isOpen: boolean;
  profile_pic: File | null;
};

type StepComponentProps = {
  data: CreateGroupFormData;
  onChange: (data: CreateGroupFormData) => void;
  onNext?: () => void;
  onBack: () => void;
  onSubmit: () => void;
  entityName: string;
};

type StepComponent = React.FC<StepComponentProps>;

const steps: StepComponent[] = [
  // StepTopics,
  StepName,
  StepDescription,
  StepPrivacy,
  StepImage,
  StepReview,
];

export default function CreateGroupForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<CreateGroupFormData>({
    name: "",
    description: "",
    // categories: [],
    isOpen: true,
    profile_pic: null,
  });

  const Step = steps[stepIndex];

  const nextStep = () => setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStepIndex((s) => Math.max(s - 1, 0));

  const router = useRouter(); // To navigate after form submission

  const utils = api.useUtils(); // Use utils to invalidate and refetch queries
  const mutation = api.groups.createGroup.useMutation({
    onSuccess: async () => {
      await utils.groups.getGroups.invalidate();
      await utils.groups.getGroups.refetch();
    },
  });

  const handleSubmit = async () => {
    try {
      if (!formData.name.trim()) {
        alert("El nombre del grupo es obligatorio.");
        return;
      }

      const profilePicBase64 = formData.profile_pic
        ? await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            if (formData.profile_pic) {
              reader.readAsDataURL(formData.profile_pic);
            } else {
              reject(new Error("Profile picture is null"));
            }
          })
        : null;

      await mutation.mutateAsync({
        name: formData.name,
        description: formData.description,
        isOpen: formData.isOpen,
        profilePic: profilePicBase64?.split(",")[1] ?? undefined, // Remove the "data:" prefix
      });

      alert("Grupo creado exitosamente.");
      setFormData({
        name: "",
        description: "",
        isOpen: true,
        profile_pic: null,
      });

      // Navigate to the search page after successful creation
      router.push("/search?source=groups");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      alert("Error al crear el grupo: " + errorMessage);
    }
  };

  return (
    <div>
      {/* Enlace para volver al feed */}
      <Link
        href="/search?source=groups"
        className="mb-4 block text-stone-400 hover:underline"
      >
        &larr; Volver al inicio
      </Link>

      <p className="text-muted-foreground mb-4 text-sm">
        Paso {stepIndex + 1} de {steps.length}
      </p>

      {Step ? (
        <Step
          data={formData}
          onChange={setFormData}
          onNext={nextStep}
          onBack={prevStep}
          onSubmit={handleSubmit}
          entityName="grupo"
        />
      ) : (
        <p>Error: Invalid step index</p>
      )}
    </div>
  );
}
