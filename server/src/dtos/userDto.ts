import { ObjectId } from "mongodb";
import { IUserDto } from "../types/user/IUserDto";

export class UserDto {
  email: string;
  phoneNumber: string;
  _id: ObjectId;
  name: string;
  roles: string[];

  constructor(props: IUserDto) {
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this._id = props._id;
    this.name = props.name;
    this.roles = props.roles;
  }
}
