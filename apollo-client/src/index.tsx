import * as serviceWorker from "./serviceWorker";
// React
import React from "react";
import ReactDOM from "react-dom";
// Create a client
import { gql } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// Connect your client to React
import { ApolloProvider, useQuery } from "react-apollo";
import App from "./app";

/**
 * 先启动GraphQL server.
 * 配置 uri
 * it defaults to the /graphql endpoint on the same host your app is served from.
 */

const httpLink = createHttpLink({
  uri: "http://localhost:4008/graphql"
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: httpLink,
  cache: new InMemoryCache()
});

const GRAPHQL_SCHEMA = gql`
  {
    hello
  }
`;

client
  .query({
    query: GRAPHQL_SCHEMA
  })
  .then(result => console.log("Server fetch", result));

// use ApolloProvider to connect your client to React
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// 如果需要离线运行或者更快加载，只需unregister()替换为register()
serviceWorker.unregister();
