import { ObjectId } from "mongodb";

export interface IUserDto {
  email: string;
  phoneNumber: string;
  _id: ObjectId;
  name: string;
  roles: string[];
}
