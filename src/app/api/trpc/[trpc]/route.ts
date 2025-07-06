import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest, headers: Headers) => {
  return createTRPCContext({
    req, headers
  });
};

const handler = async (req: NextRequest) => {

  const responseHeaders = new Headers();

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req, responseHeaders),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });

  const body = await response.text();
  const status = response.status;
  const headers = new Headers(response.headers);

  for (const [key, value] of responseHeaders.entries()) {
    headers.append(key, value);
  }

  const returnResponse = new Response(body, {
    status,
    headers,
  });

  console.log(returnResponse);
  return returnResponse;

}

export { handler as GET, handler as POST };
