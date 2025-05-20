/**
 * This file handles the logic of using the Main API of our App, which uses GraphQL
 */

import { ApolloError, type DocumentNode } from "@apollo/client";
import type { GraphQLError } from "graphql/error/GraphQLError";
import { serverClient } from "~/graphql/apolloClient";

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * 
 * @param req       A GraphQL DocumentNode, which has your request
 * @param mutation  A boolean that indicates whether your GraphQL request is a mutation or not (which means its a query)
 * @returns         EThe result of API call, which contains some data an possible errors (even if it was succesful, sometimes)
 */

export const callGraphqlAPI = async<T> (
    req:        DocumentNode, 
    mutation =  false, 
    variables:  Record<string, unknown> = {}
): Promise<GraphQLResponse<T>> => {
    
    console.log("Starting GraphQL request");

    let result = undefined;
    
    try {

        if (!mutation)  {   result = await serverClient.query( {query: req})                            }
        else            {   result = await serverClient.mutate({mutation: req, variables: variables})   }
        
        return { data: result.data as T };
        
    } catch (error) {
        
        let errors = "Unknown GraphQL Call Error";
        
        if (error instanceof ApolloError) {
            if (error.networkError)         {errors = error.networkError.message}
            else if (error.graphQLErrors) {
                error.graphQLErrors.forEach (err => errors.concat(`; ${err.message}`));
            }
        }
        else if (error instanceof Error)    {errors = error.message}
                
        console.error("GraphQL Operation Mistake: ", errors);
        throw new Error(errors);

    }


}