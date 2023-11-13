import { ApiError } from "../exceptions/ApiError";
import { IUserDto } from "../types/user/IUserDto";

export const checkRoles = (requiredRoles: string[], userData: IUserDto) => {
  const userRoles = userData.roles;

  for (let el of userRoles) {
    if (requiredRoles.includes(el)) {
      return;
    }
  }

  throw ApiError.Forbidden("User is prohibited from performing this operation");
};
