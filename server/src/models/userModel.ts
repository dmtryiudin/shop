import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  phoneNumber: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

export const UserModel = model("User", UserSchema);
