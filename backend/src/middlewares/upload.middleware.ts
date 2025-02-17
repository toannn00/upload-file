import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
import { MAX_FILE_SIZE } from "../constants/constant";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.size && file.size > MAX_FILE_SIZE) {
    cb(new HttpException(400, "File size exceeds 5MB limit"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export const handleMulterError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      next(new HttpException(400, "File size exceeds 5MB limit"));
    } else {
      next(new HttpException(400, err.message));
    }
  } else {
    next(err);
  }
};
