import { Response } from "express";
import Visit from "../models/visitModel";
import { TrackRequest } from "../types/requestTypes";
import User from "../models/userModel";

export const trackVisit = async (req: TrackRequest, res: Response) => {
  const apiKey = req.header("x-api-key");

  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    const payload = {
      ...req.body,
      apiKey,
    };

    const newVisit = new Visit(payload);

    await newVisit.save();

    res.status(201).json({ message: "Visit tracked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to track visit", error });
  }
};
