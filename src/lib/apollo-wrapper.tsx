"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import possibleTypes from "../../possibleTypes.json";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WORDPRESS_URL + '/graphql' ||
  "https://faustexample.wpengine.com/graphql";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache({ possibleTypes }),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
  });
}

const client = makeClient();

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
