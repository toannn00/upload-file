import { File } from "../models/file.model";
import { IFile } from "../interfaces/file.interface";
import { HttpException } from "../exceptions/HttpException";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadResult } from "../interfaces/cloudinary.interface";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../constants/env.constant";

export class FileService {
  constructor() {
    this.initializeCloudinary();
  }

  private initializeCloudinary(): void {
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    userId: string
  ): Promise<IFile> {
    try {
      const uploadResult = await this.uploadToCloudinary(file);

      const fileData = {
        fileName: uploadResult.public_id,
        originalName: file.originalname,
        url: uploadResult.secure_url,
        format: uploadResult.format,
        size: file.size,
        userId,
      };

      return await File.create(fileData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error("File upload error:", error);
      throw new HttpException(500, "Error uploading file");
    }
  }

  public async getFilesByUser(userId: string): Promise<IFile[]> {
    try {
      return await File.find({ userId });
    } catch (error) {
      throw new HttpException(500, "Error retrieving files");
    }
  }

  private async uploadToCloudinary(
    file: Express.Multer.File
  ): Promise<CloudinaryUploadResult> {
    try {
      if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        throw new HttpException(500, "Cloudinary configuration is missing");
      }

      const uploadOptions = {
        folder: "uploads",
        resource_type: "auto" as const,
      };

      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;

      const result = await cloudinary.uploader.upload(dataURI, uploadOptions);
      return result as CloudinaryUploadResult;
    } catch (error) {
      throw new HttpException(500, "Error uploading file to Cloudinary");
    }
  }
}
