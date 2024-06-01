import { Router } from "express";
import { getMetrics } from "../controllers/metricsController";

const router = Router();

router.get("/", getMetrics as any);

export { router as metricsRoutes };
