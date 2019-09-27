import fs from "fs";
import path from "path";
export { default as resolvers } from "./resolvers";
import { gql } from "apollo-server-express";

const schema = fs.readFileSync(path.join(__dirname, "schema.graphql"), {
  encoding: "utf8"
});

export const typeDefs = gql(schema);
