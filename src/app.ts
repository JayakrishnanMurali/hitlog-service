import bodyParser from "body-parser";
import express from "express";
import { trackingRoutes } from "./routes/trackingRoutes";
import { authRoutes } from "./routes/authRoutes";
import { metricsRoutes } from "./routes/metricRoutes";
import { projectRoutes } from "./routes/projectRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("/track", trackingRoutes);
app.use("/auth", authRoutes);
app.use("/metrics", metricsRoutes);
app.use("/project", projectRoutes);

export default app;
