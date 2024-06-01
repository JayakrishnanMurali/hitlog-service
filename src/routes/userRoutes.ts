import { Router } from "express";
import { getApiKey } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserRequest } from "../types/requestTypes";

const router = Router();

router.get("/apikey", authMiddleware as any, getApiKey as any);

export { router as userRoutes };
