import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { indexRouter } from "./routes/index.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.route";
import mongoose from "mongoose";
import { fileRouter } from "./routes/file.route";
import { MONGODB_URI } from "./constants/env.constant";

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private async connectToDatabase() {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.use("/api", indexRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/files", fileRouter);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
