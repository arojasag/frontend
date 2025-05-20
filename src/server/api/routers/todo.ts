/** This router has some todo tRPC code, that is really just a template */

// import { z } from "zod";
import { callGraphqlAPI } from "~/graphql/callGraphql";
import { GET_TODOS } from "~/graphql/documents";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface todo {
    id: string,
    text: string,
    user: {
        id: string
    }
}

interface TodoResponse {
    todos: todo[]
}

export const todoRouter = createTRPCRouter({
    getTodo: publicProcedure
        .query(async () => {
            return {                
                todos: (await callGraphqlAPI<TodoResponse>(GET_TODOS)).data   
            };
        }),
})