import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { HttpException } from "../exceptions/HttpException";

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
      allowUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      next(new HttpException(400, errorMessage));
    }

    next();
  };
};
