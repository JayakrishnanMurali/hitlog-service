import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  rotateApiKey,
} from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", createProject as any);
router.get("/", getProjects as any);
router.get("/:projectId", getProjectById as any);
router.post(
  "/invalidate-api-key/:projectId",

  rotateApiKey as any
);
router.delete("/:projectId", deleteProject as any);

export { router as projectRoutes };
