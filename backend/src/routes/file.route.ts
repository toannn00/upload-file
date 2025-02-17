import { Router } from "express";
import { FileController } from "../controllers/file.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import multer from "multer";

const router = Router();
const fileController = new FileController();
const upload = multer({ storage: multer.memoryStorage() });

// upload file
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  fileController.uploadFile
);

// get all files
router.get("/", authMiddleware, fileController.getFiles);

export const fileRouter = router;
