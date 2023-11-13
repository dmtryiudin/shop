import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const RegistrationInput = new GraphQLInputObjectType({
  name: "Registration",
  fields: {
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});
