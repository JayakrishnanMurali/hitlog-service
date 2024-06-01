import { Router } from "express";
import { trackVisit } from "../controllers/trackingController";

const router = Router();

router.post("/", trackVisit);

export { router as trackingRoutes };
