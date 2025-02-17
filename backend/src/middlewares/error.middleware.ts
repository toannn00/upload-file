import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { HttpException } from "../exceptions/HttpException";
import { createResponse } from "../utils/response.util";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error instanceof HttpException ? error.status : 500;
  const message = error.message || "Something went wrong";

  logger.error(
    `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
  );

  res.status(status).json(
    createResponse(false, undefined, {
      message,
      code: status,
    })
  );
};
