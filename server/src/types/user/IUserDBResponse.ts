import { ObjectId } from "mongodb";

export interface IUserDBResponse {
  _id: ObjectId;
  email: string;
  phoneNumber: string;
  password: string;
  name: string;
  roles: string[];
}
