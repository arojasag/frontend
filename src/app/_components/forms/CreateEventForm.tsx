"use client";

import { useState } from "react";
import StepTitle from "./steps/StepTitle";
import StepDescription from "./steps/StepDescription";
import StepLocation from "./steps/StepLocation";
import StepDateTime from "./steps/StepDateTime";
import StepCapacity from "./steps/StepCapacity";
import StepImage from "./steps/StepImage";
import StepReview from "./steps/StepReview2";
import Link from "next/link";

export type CreateEventFormData = {
  title: string;
  description: string;
  place: string;
  starts_at: string;
  ends_at: string;
  capacity: string;
  groupId: string;
  profile_pic: File | null;
};

type StepComponentProps = {
  data: CreateEventFormData;
  onChange: (data: CreateEventFormData) => void;
  onNext?: () => void;
  onBack: () => void;
  onSubmit: () => void;
  entityName: string;
};

type StepComponent = React.FC<StepComponentProps>;

const steps: StepComponent[] = [
  StepTitle,
  StepDescription,
  StepLocation,
  StepDateTime,
  StepCapacity,
  StepImage,
  StepReview,
];

export default function CreateEventForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<CreateEventFormData>({
    title: "",
    description: "",
    place: "",
    starts_at: "",
    ends_at: "",
    capacity: "",
    groupId: "",
    profile_pic: null,
  });

  const Step = steps[stepIndex];

  const nextStep = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const prevStep = () => setStepIndex((i) => Math.max(i - 1, 0));

  const handleSubmit = async () => {
    alert(formData.title);
  };

  return (
    <div>
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
          entityName="evento"
        />
      ) : (
        <p>Error: Invalid step index</p>
      )}
    </div>
  );
}
