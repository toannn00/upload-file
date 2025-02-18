import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { authSchema } from "../schemas/validation/auth.validation";

const router = Router();
const authController = new AuthController();

// authenticate (login/register)
router.post(
  "/authenticate",
  validateRequest(authSchema),
  authController.authenticate
);

export const authRouter = router;
