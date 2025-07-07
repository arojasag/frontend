"use client";

import React from "react";
import AuthForm from "~/app/_components/forms/AuthForm";
import { signInSchema } from "~/lib/validations";
import { api } from "~/trpc/react";

const SignIn = () => {
  const signInMutation = api.auth.login.useMutation();

  const handleSubmit = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await signInMutation.mutateAsync(data);
      console.log("Inicio de sesión exitoso:", response);
      return { success: true };
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default SignIn;
