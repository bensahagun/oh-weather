import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env.local" });

import { ApolloServer } from "apollo-server";
import { schema } from "./src/schema";
import { dataSources } from "./src/dataSources";

const server = new ApolloServer({ schema, dataSources, playground: process.env.NODE_ENV !== "production" });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
