import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const LoginInput = new GraphQLInputObjectType({
  name: "Login",
  fields: {
    emailOrPhoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});
