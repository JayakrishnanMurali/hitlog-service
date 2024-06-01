import { Router } from "express";
import {
  createProject,
  getProjects,
  rotateApiKey,
} from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware as any, createProject as any);
router.get("/", authMiddleware as any, getProjects as any);
router.post(
  "/invalidate-api-key/:projectId",
  authMiddleware as any,
  rotateApiKey as any
);

export { router as projectRoutes };
