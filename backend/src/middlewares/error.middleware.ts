import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(
    `[${req.method}] ${req.path} >> StatusCode:: ${res.statusCode}, Message:: ${error.message}`
  );
  res.status(500).json({ message: error.message });
};
