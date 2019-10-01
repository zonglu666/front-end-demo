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
import { ApolloProvider } from "react-apollo";
import App from "./app";

import { setContext } from "apollo-link-context";
import { concat } from "apollo-link";

/**
 * 先启动GraphQL server.
 * 配置 uri
 * it defaults to the /graphql endpoint on the same host your app is served from.
 */

const setHeadersLink = setContext(() => {
  return {
    headers: {
      "xiangx-wxapp-appid": "wx4f80d371367e3b56",
      "xiangx-access-token": "a10a1ab26baeaff19e772fdff3a0a8346b452607"
    }
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: concat(setHeadersLink, httpLink),
  cache: new InMemoryCache()
});

const GRAPHQL_SCHEMA = gql`
  query ProductsByBrand($cursor: String, $id: String) {
    productsByBrand(cursor: $cursor, id: $id) {
      list {
        skuId
      }
      cursor
    }
  }
`;

const observable = client.watchQuery({
  query: GRAPHQL_SCHEMA,
  variables: {
    $cursor: ""
  },
  fetchPolicy: "cache-and-network"
});

let result: any;

observable.subscribe(value => {
  if (!value.loading && value.data) {
    result = value.data["productsByBrand"];
    console.log("result", result);
  }
});

const refetch = () => {
  console.log("refetch");
  observable
    .refetch({
      $cursor: ""
    })
    .then(result => {
      console.log("Server query refetch", JSON.stringify(result));
    });
};

const fetchMore = () => {
  console.log("fetchMore");
  console.log("result.cursor", result.cursor);

  observable.fetchMore({
    query: GRAPHQL_SCHEMA,
    variables: {
      $cursor: "5cde6aa879afbf0025a468ce"
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      console.log("fetchMoreResult", fetchMoreResult);
      return {
        ...prev,
        productsByBrand: {
          ...prev["productsByBrand"],
          cursor: fetchMoreResult["productsByBrand"].cursor
        }
      };
    }
  });
};

// use ApolloProvider to connect your client to React
ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <App /> */}
    <button onClick={refetch}>refetch</button>
    <br></br>
    <button onClick={fetchMore}>fetchMore</button>
    <div>cursor: {result && result.data}</div>
  </ApolloProvider>,
  document.getElementById("app")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// 如果需要离线运行或者更快加载，只需unregister()替换为register()
serviceWorker.unregister();
