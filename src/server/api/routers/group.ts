/**
 * Group Router
 */

import type { UUID } from "node:crypto";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { callGraphqlAPI } from "~/graphql/callGraphql";
import { GET_GROUPS } from "~/graphql/documents";

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
    createdAt: Date
    updatedAt: Date
}

export interface GetGroupsResponse {
    groups: Group[]
}

export const groupRouter = createTRPCRouter({
    getGroups: publicProcedure
        .query(async () => {
            return {
                groups: ((await callGraphqlAPI<GetGroupsResponse>(GET_GROUPS)).data)
            }
        }),
    
})