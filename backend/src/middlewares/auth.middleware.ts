import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AuthRequest } from "../interfaces/auth.interface";
import { HttpException } from "../exceptions/HttpException";
import { JWT_SECRET } from "../constants/env.constant";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpException(401, "Authentication token required");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        throw new HttpException(401, "User not found");
      }

      req.user = user;
      next();
    } catch (error) {
      throw new HttpException(401, "Invalid authentication token");
    }
  } catch (error) {
    next(error);
  }
};
