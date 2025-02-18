import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
import { MAX_FILE_SIZE, ACCEPTED_MIME_TYPES } from "../constants/constant";
import * as FileType from "file-type";

const storage = multer.memoryStorage();

const fileFilter = async (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  try {
    if (file.size && file.size > MAX_FILE_SIZE) {
      return cb(new HttpException(400, "File size exceeds 5MB limit"));
    }

    if (!ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new HttpException(400, "File type not supported"));
    }

    cb(null, true);
  } catch (error) {
    cb(new HttpException(400, "Error processing file"));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export const validateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new HttpException(400, "No file uploaded");
    }

    const fileTypeResult = await FileType.fromBuffer(req.file.buffer);

    if (!fileTypeResult) {
      throw new HttpException(400, "Could not determine file type");
    }

    const actualMimeType = fileTypeResult.mime;

    if (!ACCEPTED_MIME_TYPES.includes(actualMimeType)) {
      throw new HttpException(400, "Invalid image file");
    }

    if (actualMimeType !== req.file.mimetype) {
      throw new HttpException(400, "File type mismatch");
    }

    next();
  } catch (error) {
    next(error);
  }
};

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
