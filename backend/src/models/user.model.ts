import mongoose from "mongoose";
import userSchema from "../schemas/user.schema";
import { IUser } from "../interfaces/user.interface";

export const User = mongoose.model<IUser>("User", userSchema);
