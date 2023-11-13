import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./userType";

export const UserRegType = new GraphQLObjectType({
  name: "UserReg",
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) },
  },
});
