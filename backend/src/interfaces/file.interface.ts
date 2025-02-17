import { Document } from "mongoose";

export interface IFile extends Document {
  fileName: string;
  originalName: string;
  url: string;
  format: string;
  size: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
