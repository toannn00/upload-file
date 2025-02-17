import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { createResponse } from "../utils/response.util";

export class AuthController {
  private authService = new AuthService();

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.authenticate(email, password);
      res.status(200).json(createResponse(true, { token }));
    } catch (error) {
      next(error);
    }
  };
}
