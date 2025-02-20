import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { HttpException } from "../exceptions/HttpException";
import { IUser } from "../interfaces/user.interface";
import { JWT_SECRET } from "../constants/env.constant";

export class AuthService {
  public async authenticate(email: string, password: string): Promise<string> {
    try {
      let user = await User.findOne({ email });

      // If user doesn't exist, create new user
      if (!user) {
        user = await User.create({ email, password });
      } else {
        // If user exists, verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          throw new HttpException(401, "Invalid credentials");
        }
      }

      const token = this.generateToken(user);
      return token;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (
        error instanceof Error &&
        "name" in error &&
        error.name === "ValidationError"
      ) {
        throw new HttpException(400, "Invalid input data");
      }

      if (error instanceof Error && "code" in error && error.code === 11000) {
        throw new HttpException(409, "Email already exists");
      }

      console.error(error);
      throw new HttpException(500, "Internal server error");
    }
  }

  private generateToken(user: IUser): string {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "10s" });
  }
}
