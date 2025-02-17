import { Router } from "express";
import { IndexController } from "../controllers/index.controller";

const router = Router();
const indexController = new IndexController();

router.get("/", indexController.index);

export const indexRouter = router;
