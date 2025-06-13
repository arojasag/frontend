"use client";

import { useState } from "react";
import Link from "next/link"; // Importa Link si usas Next.js
import StepTopics from "./steps/StepTopics";
import StepName from "./steps/StepName";
import StepDescription from "./steps/StepDescription";
import StepPrivacy from "./steps/StepPrivacy";
import StepImage from "./steps/StepImage";
import StepReview from "./steps/StepReview";

export type CreateGroupFormData = {
  name: string;
  description: string;
  categories: string[];
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
  StepTopics,
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
    categories: [],
    isOpen: true,
    profile_pic: null,
  });

  const Step = steps[stepIndex];

  const nextStep = () => setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStepIndex((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    alert(formData.name);
  };

  return (
    <div>
      {/* Enlace para volver al feed */}
      <Link href="/feed" className="mb-4 block text-stone-400 hover:underline">
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
