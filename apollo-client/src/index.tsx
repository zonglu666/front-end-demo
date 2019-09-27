import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app";

const httpLink = createHttpLink({
  uri: "http://localhost:4006/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

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
