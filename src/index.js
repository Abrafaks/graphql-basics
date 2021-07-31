import { GraphQLServer, PubSub } from "graphql-yoga";
import ip from "ip";
import db from "./db";
import Query from "./resolvers/Query";
import Comment from "./resolvers/Comment";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: { db, pubsub },
});

server.start(() => {
  console.log("The server is up." + ip.address());
});
