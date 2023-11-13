import { GraphQLSchema } from "graphql";
import { RootQueryType } from "./types/rootQueryType";
import { MutationType } from "./types/mutationType";

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
