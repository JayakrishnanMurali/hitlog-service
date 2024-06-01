import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 50,
  message: "Too many requests",
  standardHeaders: true,
  legacyHeaders: false,
});
