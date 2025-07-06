"use client";

import React from "react";
import AuthForm from "~/app/_components/forms/AuthForm";
import { signUpSchema } from "~/lib/validations";
import { api } from "~/trpc/react";

const SignUp = () => {
  const signUpMutation = api.auth.singUp.useMutation();

  const handleSubmit = async (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await signUpMutation.mutateAsync({
        ...data,
        username: data.fullName, // Map fullName to username
      });
      console.log("Registro exitoso:", response);
      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUp;
