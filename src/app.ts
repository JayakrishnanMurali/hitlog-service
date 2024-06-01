import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import { logger } from "./middlewares/logger";
import { apiRateLimiter } from "./middlewares/rateLimiter";
import { authRoutes } from "./routes/authRoutes";
import { metricsRoutes } from "./routes/metricRoutes";
import { projectRoutes } from "./routes/projectRoutes";
import { trackingRoutes } from "./routes/trackingRoutes";

const app = express();

app.use(logger);

app.use(cors());

// Middleware
app.use(bodyParser.json());

app.use(apiRateLimiter);

// Routes
app.use("/ping", (req, res) => {
  res.send("pong");
});

// Public routes - JS tracking snippet
app.use("/track", trackingRoutes);

app.use("/auth", authRoutes);

// Protected routes
app.use(authMiddleware as any);
app.use("/metrics", metricsRoutes);
app.use("/project", projectRoutes);

export default app;
