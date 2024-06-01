import bodyParser from "body-parser";
import express from "express";
import { trackingRoutes } from "./routes/trackingRoutes";
import { authRoutes } from "./routes/authRoutes";
import { metricsRoutes } from "./routes/metricRoutes";
import { projectRoutes } from "./routes/projectRoutes";
import { apiRateLimiter } from "./middlewares/rateLimiter";
import { authMiddleware } from "./middlewares/authMiddleware";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));

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
