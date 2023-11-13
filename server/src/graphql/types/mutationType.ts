import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserController } from "../../controller/userController";
import { UserRegType } from "./userRegDataType";
import { RegistrationInput } from "../inputs/registrationInput";
import { LoginInput } from "../inputs/loginInput";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registration: {
      type: new GraphQLNonNull(UserRegType),
      args: {
        input: { type: new GraphQLNonNull(RegistrationInput) },
      },
      resolve: UserController.registration,
    },
    login: {
      type: new GraphQLNonNull(UserRegType),
      args: {
        input: { type: new GraphQLNonNull(LoginInput) },
      },
      resolve: UserController.login,
    },
  },
});
