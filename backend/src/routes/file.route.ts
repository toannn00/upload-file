import { Router } from "express";
import { FileController } from "../controllers/file.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload, handleMulterError } from "../middlewares/upload.middleware";

const router = Router();
const fileController = new FileController();

// upload file
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  handleMulterError,
  fileController.uploadFile
);

// get all files
router.get("/", authMiddleware, fileController.getFiles);

export const fileRouter = router;
