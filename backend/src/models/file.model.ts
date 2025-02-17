import mongoose from "mongoose";
import fileSchema from "../schemas/file.schema";
import { IFile } from "../interfaces/file.interface";

export const File = mongoose.model<IFile>("File", fileSchema);
