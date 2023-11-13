import jwt from "jsonwebtoken";
import { IUserDto } from "../types/user/IUserDto";
import { ApiError } from "../exceptions/ApiError";

class Service {
  generateToken(payload: IUserDto) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || "", {
      expiresIn: "7d",
    });

    return { token };
  }

  checkToken(token: string) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY || "");

      return tokenData;
    } catch {
      throw ApiError.AuthorizationError();
    }
  }
}

export const TokenService = new Service();
