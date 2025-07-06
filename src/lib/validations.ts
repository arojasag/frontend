import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Nombre completo requerido"),
  email: z
    .string()
    .email("Correo electrónico inválido")
    .refine((email) => email.endsWith("@unal.edu.co"), {
      message: "El correo debe ser del dominio @unal.edu.co",
    }),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
