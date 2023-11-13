import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./userType";
import { UserController } from "../../controller/userController";
import { checkRoles } from "../../utils/checkRoles";

export const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (a, b, context) => {
        const userData = UserController.checkToken(context);
        checkRoles(["ADMIN"], userData);

        return null;
      },
    },
    welcome: {
      type: GraphQLString,
      resolve: () => "Welcome to GraphQL!",
    },
  },
});
