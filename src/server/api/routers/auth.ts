/**
 * Auth Router
 */

import { callGraphqlAPI } from "~/graphql/callGraphql"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { SIGN_UP } from "~/graphql/documents"
import { z } from "zod"
import type { GraphQLFormattedError } from "graphql"

interface User {
    id: string
    email: string
    username: string
    isSuperUser: boolean
    authToken: string
}

type SignUpProcedureReturn = Omit<User, 'authToken'>

type LoginUserReturn = Omit<User, 'id' | 'isSuperUser'>

type LoginProcedureReturn = Omit<LoginUserReturn, 'authToken'>

export const authRouter = createTRPCRouter({
    singUp: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string(),
            username: z.string(),
        }))
        .mutation(async ({ input, ctx }): Promise<SignUpProcedureReturn | GraphQLFormattedError[]> => {
            const response = (await callGraphqlAPI<{signUp: User}>(
                SIGN_UP,
                true,
                {
                    input: {
                        email: input.email,
                        password: input.password,
                        username: input.username,
                    }
                }
            ))
            if(!response.errors) {
                if(response.data) { // This always happens
                    const user = response.data.signUp;
                    if(user.authToken) {
                        const cookie = [
                        `auth_token=${user.authToken}`,
                        "HttpOnly",
                        "Secure",
                        "SameSite=Lax",
                        "Path=/",
                        "Max-Age=3600"
                        ].join("; ");
                        ctx.headers.set("Set-Cookie", cookie);
                    }
                    const { authToken: _, ...withoutAuthToken } = user;
                    return withoutAuthToken;
                } else {
                    throw new Error("Invalid GraphQL Response, no data, no errors") // This will never happen
                }
            }
            else return response.errors;
        })
        ,
    login: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string(),
        }))
        .query(async ( { input, ctx } ): Promise<LoginProcedureReturn | GraphQLFormattedError[]> => {
            const response = (await callGraphqlAPI<{login: LoginUserReturn}>(
                SIGN_UP,
                true,
                {
                    input: {
                        email: input.email,
                        password: input.password,
                    }
                }
            ))
            if(!response.errors) {
                if(response.data) { // This always happens
                    const user = response.data.login;
                    if(user.authToken) {
                        const cookie = [
                        `auth_token=${user.authToken}`,
                        "HttpOnly",
                        "Secure",
                        "SameSite=Lax",
                        "Path=/",
                        "Max-Age=3600"
                        ].join("; ");
                        ctx.headers.set("Set-Cookie", cookie);
                    }
                    const { authToken: _, ...withoutAuthToken } = user;
                    return withoutAuthToken;
                } else {
                    throw new Error("Invalid GraphQL Response, no data, no errors") // This will never happen
                }
            }
            else return response.errors;
        })
})