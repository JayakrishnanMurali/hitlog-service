import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types/requestTypes";
import { config } from "../config";

export const authMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error: any) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
