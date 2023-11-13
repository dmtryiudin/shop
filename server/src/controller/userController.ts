import jwt from "jsonwebtoken";
import { ApiError } from "../exceptions/ApiError";
import { UserService } from "../service/userService";
import {
  IContextParams,
  IResolverParams,
} from "../types/common/IResolverParams";
import {
  ILoginParams,
  IRegistrationsParams,
} from "../types/user/IRegistrationParams";
import { validateParams } from "../utils/validateParams";
import { TokenService } from "../service/tokenService";
import { IUserDto } from "../types/user/IUserDto";

class Controller {
  async registration(_: any, params: IResolverParams<IRegistrationsParams>) {
    const { email, phoneNumber, password, name } = params.input;

    validateParams({
      email: {
        value: email,
        isEmail: true,
      },
      phoneNumber: {
        value: phoneNumber,
        isPhoneNumber: true,
      },
      password: {
        value: password,
        isPassword: true,
      },
      name: {
        value: name,
        length: [2, 50],
      },
    });

    const userData = await UserService.registration(
      email,
      phoneNumber,
      password,
      name
    );

    return userData;
  }

  async login(_: any, params: IResolverParams<ILoginParams>) {
    const { emailOrPhoneNumber, password } = params.input;

    validateParams({
      emailOrPhoneNumber: {
        value: emailOrPhoneNumber,
        isEmailOrPhoneNumber: true,
      },
    });

    const userData = await UserService.login(emailOrPhoneNumber, password);

    return userData;
  }

  checkToken(context: IContextParams) {
    const authTokenString = context.authorization;

    if (!authTokenString) {
      throw ApiError.AuthorizationError();
    }

    const bearerToken = authTokenString.split(" ")[1];

    if (!bearerToken) {
      throw ApiError.AuthorizationError();
    }

    return TokenService.checkToken(bearerToken) as IUserDto;
  }
}

export const UserController = new Controller();
