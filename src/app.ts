import bodyParser from "body-parser";
import express from "express";
import { trackingRoutes } from "./routes/trackingRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("/track", trackingRoutes);

export default app;
