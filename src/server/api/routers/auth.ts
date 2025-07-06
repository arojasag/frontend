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
            const response = (await callGraphqlAPI<User>(
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
                if(response.data?.authToken) {
                    ctx.res.cookies.set('auth_token', response.data.authToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'lax',
                        maxAge: 3600,
                    });
                }
                return response.data
            }
            else return response.errors;
        })
        ,
})