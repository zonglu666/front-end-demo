if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express from "express";
import config from "./config";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./api/graphql";

const playground: any = {
  settings: {
    "editor.theme": "light",
    "editor.cursorShape": "line"
  }
};

const server = new ApolloServer({
  playground,
  typeDefs,
  resolvers
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: config.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`
  )
);
