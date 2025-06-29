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
}

export const authRouter = createTRPCRouter({
    singUp: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string()
        }))
        .mutation(async ({ input }) => {
            const response = (await callGraphqlAPI<User>(
                SIGN_UP,
                true,
                {
                    input: {
                        email: input.email,
                        password: input.password,
                    }
                }
            ))
            if(!response.errors) return response.data
            else return response;
        })
        ,
})