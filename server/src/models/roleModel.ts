import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  value: { type: String, unique: true, default: "USER" },
});

export const RoleModel = model("Role", RoleSchema);
