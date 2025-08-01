/* GraphQL Configuration */

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
  type DefaultContext,
} from "@apollo/client";
import type { UUID } from "crypto";

type ReqHeaders = Record<UUID, Headers>

/** A record that stores the headers of the various requests */
export const RequestHeaders: ReqHeaders = {}

interface ApolloContext extends DefaultContext{
  response: {
    headers: Headers
  }
  reqId: UUID
  authToken?: string
}

/** This Link captures the headers of the response, and saves them in the Record of Headers */
const headerCaptureLink = new ApolloLink((operation, forward) => {
  const { authToken } = operation.getContext() as ApolloContext;

  // Setting Auth Token to send to the GraphQL API.
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
  }));

  // This executes when we receive a response, not when we send a request:
  return forward(operation).map((response) => {

    const context = operation.getContext() as ApolloContext;
    const reqId = context.reqId;
    RequestHeaders[reqId] = context.response.headers;

    return response;
  });
});


const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_API ?? "http://localhost:4000/query",
  fetch,
});



export const serverClient = new ApolloClient({
  link: from([
    headerCaptureLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
});

export default serverClient;
