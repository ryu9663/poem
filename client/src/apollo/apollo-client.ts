import { ApolloClient, InMemoryCache } from "@apollo/client";
import isLoginVar from "./stores/isLogin";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getTodos: {
          read() {
            return isLoginVar();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:80/graphql",
  cache,
});

export default client;
