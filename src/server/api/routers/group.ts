/**
 * Group Router
 */

import type { UUID } from "node:crypto";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { callGraphqlAPI } from "~/graphql/callGraphql";
import { CREATE_GROUP, GET_GROUPS } from "~/graphql/documents";
import { z } from "zod";

export interface Group {
    id: UUID
    name: string 
    description: string
    profilePic: {
        data: string
        mimeType: string
    }
    isVerified: boolean
    isOpen: boolean
    createdAt: number
    updatedAt: number
}

export interface GetGroupsResponse {
    groups: Group[]
}

export interface CreateGroupResponse {
    id: UUID
    name: string
    description: string
    isVerified: boolean
    isOpen: boolean
    createdAt: number
    updatedAt: number
}

export const groupRouter = createTRPCRouter({
    getGroups: publicProcedure
        .query(async ({ctx}) => {
            const grps = (await callGraphqlAPI<GetGroupsResponse>({
                req: GET_GROUPS,
                authToken: ctx.authCookie?.value,
            })).data;
            return {
                groups: grps?.groups.map(grp => ({
                    ...grp,
                    createdAt: new Date(grp.createdAt),
                    updatedAt: new Date(grp.updatedAt)
                }))
            }
        }),
    createGroup: publicProcedure
        .input(z.object({
            name: z.string(),
            description: z.string().optional(),
            profilePic: z.string().base64().optional(),
            isOpen: z.boolean()
        }))
        .mutation(async({ input,ctx }) => {
            const response = (await callGraphqlAPI <CreateGroupResponse>({
                req: CREATE_GROUP,
                mutation: true,
                variables: {
                    input:  {
                        name: input.name,
                        description: input.description,
                        profilePic: {
                            data: input.profilePic,
                            mimeType: "jpeg"
                        },
                        isOpen: input.isOpen
                    }
                },
                authToken: ctx.authCookie?.value
            }))
            const grpCreated = response.data;
            if(!grpCreated) return grpCreated;
            return {
                ...grpCreated,
                createdAt: new Date(grpCreated.createdAt),
                updatedAt: new Date(grpCreated.updatedAt),
            }

        })

})