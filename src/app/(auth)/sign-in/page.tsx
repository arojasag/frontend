"use client";

import React from "react";
import AuthForm from "~/app/_components/forms/AuthForm";
import { signInSchema } from "~/lib/validations";
// import { trpc } from "~/trpc/client";

const SignIn = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    // onSubmit={}
  />
);

export default SignIn;
