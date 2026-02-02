import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DocumentNode,
} from "@apollo/client";
import possibleTypes from "../../possibleTypes.json";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WORDPRESS_URL + '/graphql' ||
  "https://faustexample.wpengine.com/graphql";

// Custom fetch with extended timeout for slow WordPress connections
const fetchWithTimeout: typeof fetch = (url, options) => {
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(30000), // 30 second timeout
  });
};

export function getClient() {
  return new ApolloClient({
    cache: new InMemoryCache({ possibleTypes }),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      fetch: fetchWithTimeout,
    }),
    ssrMode: true,
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
}

export async function fetchGraphQL<T = unknown>(
  query: DocumentNode,
  variables?: Record<string, unknown>,
): Promise<T> {
  const client = getClient();
  const { data } = await client.query<T>({ query, variables });
  return data;
}

export { GRAPHQL_ENDPOINT };
