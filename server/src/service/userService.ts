import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";
import { TokenService } from "./tokenService";
import { UserDto } from "../dtos/userDto";
import { ApiError } from "../exceptions/ApiError";
import { Regex } from "../types/common/Regex";
import { IUserDBResponse } from "../types/user/IUserDBResponse";
import { RoleModel } from "../models/roleModel";

class Service {
  async registration(
    email: string,
    phoneNumber: string,
    password: string,
    name: string
  ) {
    const candidateEmail = await UserModel.findOne({ email });
    const candidatePhoneNumber = await UserModel.findOne({ phoneNumber });

    if (candidateEmail) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }

    if (candidatePhoneNumber) {
      throw ApiError.BadRequest(
        `User with phone number ${phoneNumber} already exists`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const userRole = await RoleModel.findOne({ value: "USER" });

    const user = await UserModel.create({
      email,
      password: hashPassword,
      phoneNumber,
      name,
      roles: [userRole!.value],
    });

    const userDto = new UserDto(user);
    const token = TokenService.generateToken({ ...userDto });

    return { ...token, user: userDto };
  }

  async login(emailOrPhoneNumber: string, password: string) {
    let user: IUserDBResponse | null = null;

    if (Regex.email.test(emailOrPhoneNumber)) {
      user = await UserModel.findOne({
        email: emailOrPhoneNumber,
      });
    } else {
      user = await UserModel.findOne({
        phoneNumber: emailOrPhoneNumber,
      });
    }

    if (!user) {
      throw ApiError.BadRequest("Wrong login or password");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Wrong login or password");
    }

    const userDto = new UserDto(user);
    const token = TokenService.generateToken({ ...userDto });

    return { ...token, user: userDto };
  }
}

export const UserService = new Service();
