// GraphQL Configuration File

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:8008/query",
  fetch: fetch, 
});

export const serverClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default serverClient;