import bodyParser from "body-parser";
import express from "express";
import { trackingRoutes } from "./routes/trackingRoutes";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { metricsRoutes } from "./routes/metricRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("/track", trackingRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/metrics", metricsRoutes);

export default app;
