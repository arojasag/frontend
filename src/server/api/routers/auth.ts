/**
 * Auth Router
 */

import { callGraphqlAPI } from "~/graphql/callGraphql";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { LOGIN, LOGOUT, SIGN_UP, AUTH_ME } from "~/graphql/documents";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { AUTH_TOKEN } from "~/server/api/constants";

interface User {
  id: string;
  email: string;
  username: string;
  isSuperUser: boolean;
  authToken: string;
}

type SignUpProcedureReturn = Omit<User, "authToken">;

type LoginUserReturn = Omit<User, "id" | "isSuperUser">;

type LoginProcedureReturn = Omit<LoginUserReturn, "authToken">;

const setAuthCookie = (token: string, ctx: { headers: Headers }): void => {
  const cookie = [
    `${AUTH_TOKEN}=${token}`,
    "HttpOnly",
    // "Secure",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=3600",
  ].join("; ");
  ctx.headers.set("Set-Cookie", cookie);
};

export const authRouter = createTRPCRouter({
  singUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }): Promise<SignUpProcedureReturn> => {
      const response = await callGraphqlAPI<{ signUp: User }>({
        req: SIGN_UP,
        mutation: true,
        variables: {
          input: {
            email: input.email,
            password: input.password,
            username: input.username,
          },
        },
      });
      if (!response.errors) {
        if (response.data) {
          // This always happens
          const user = response.data.signUp;
          setAuthCookie(user.authToken, ctx);
          const { authToken: _, ...withoutAuthToken } = user;
          return withoutAuthToken;
        } else {
          throw new Error("Invalid GraphQL Response, no data, no errors"); // This will never happen
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error en GraphQL",
          cause: response.errors,
        });
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }): Promise<LoginProcedureReturn> => {
      const response = await callGraphqlAPI<{ login: LoginUserReturn }>({
        req: LOGIN,
        mutation: true,
        variables: {
          input: {
            email: input.email,
            password: input.password,
          },
        },
      });
      if (!response.errors) {
        if (response.data) {
          // This always happens
          const user = response.data.login;
          setAuthCookie(user.authToken, ctx);
          const { authToken: _, ...withoutAuthToken } = user;
          return withoutAuthToken;
        } else {
          throw new Error("Invalid GraphQL Response, no data, no errors"); // This will never happen
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error en GraphQL",
          cause: response.errors,
        });
      }
    }),
  logout: publicProcedure.mutation(async ({ ctx }): Promise<boolean> => {
    await callGraphqlAPI<{ login: boolean }>({
      req: LOGOUT,
      mutation: true,
      authToken: ctx.authCookie?.value,
    });
    const cookie = [
      `${AUTH_TOKEN}=`,
      "HttpOnly",
      "SameSite=Lax",
      "Path=/",
      "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ].join("; ");
    ctx.headers.set("Set-Cookie", cookie);
    return true;
  }),
  getSession: publicProcedure.query(async ({ ctx }) => {
    const authToken = ctx.authCookie?.value;
    if (!authToken) return null;

    try {
      const response = await callGraphqlAPI<{
        authme: {
          id: string;
          email: string;
          username: string;
          isSuperUser: boolean;
        };
      }>({
        req: AUTH_ME,
        mutation: false,
        authToken,
      });

      if (response.errors || !response.data?.authme) {
        return null;
      }

      return response.data.authme;
    } catch (err) {
      console.error("❌ Error al obtener sesión con authme:", err);
      return null;
    }
  }),
});
