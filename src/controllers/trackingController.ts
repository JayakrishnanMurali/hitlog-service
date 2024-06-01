import { Request, Response } from "express";
import Visit from "../models/visitModel";

export const trackVisit = async (req: Request, res: Response) => {
  const {
    visitorId,
    sessionId,
    page,
    referrer,
    device,
    location,
    timestamp,
    duration,
    isBot,
  } = req.body;

  try {
    const newVisit = new Visit({
      visitorId,
      sessionId,
      page,
      referrer,
      device,
      location,
      timestamp,
      duration,
      isBot,
    });

    await newVisit.save();

    res.status(201).json({ message: "Visit tracked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to track visit", error });
  }
};
