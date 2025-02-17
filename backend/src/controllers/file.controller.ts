import { Request, Response, NextFunction } from "express";
import { FileService } from "../services/file.service";
import { AuthRequest } from "../interfaces/auth.interface";
import { createResponse } from "../utils/response.util";

export class FileController {
  private fileService = new FileService();

  public uploadFile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const file = await this.fileService.uploadFile(req.file, req.user.id);
      res.status(201).json(createResponse(true, { file }));
    } catch (error) {
      next(error);
    }
  };

  public getFiles = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      const files = await this.fileService.getFilesByUser(req.user.id);
      res.status(200).json(createResponse(true, { files }));
    } catch (error) {
      next(error);
    }
  };
}
