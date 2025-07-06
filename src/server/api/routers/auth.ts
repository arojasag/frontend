/**
 * Auth Router
 */

import { callGraphqlAPI } from "~/graphql/callGraphql"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { SIGN_UP } from "~/graphql/documents"
import { z } from "zod"

interface User {
    id: string
    email: string
    username: string
    isSuperUser: boolean
    authToken: string
}

export const authRouter = createTRPCRouter({
    singUp: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string(),
            username: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
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
                if(response.data?.signUp.authToken) {
                    const cookie = [
                    `auth_token=${response.data?.signUp.authToken}`,
                    "HttpOnly",
                    "Secure",
                    "SameSite=Lax",
                    "Path=/",
                    "Max-Age=3600"
                    ].join("; ");
                    ctx.headers.set("Set-Cookie", cookie);
                }
                return response.data?.signUp;
            }
            else return response.errors;
        })
        ,
})