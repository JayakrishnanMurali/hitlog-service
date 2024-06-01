import { Response } from "express";
import Project from "../models/projectModel";
import Visit from "../models/visitModel";
import { TrackRequest } from "../types/requestTypes";

export const trackVisit = async (req: TrackRequest, res: Response) => {
  const apiKey = req.header("x-api-key");

  try {
    const project = await Project.findOne({ apiKey });
    if (!project) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    const payload = {
      ...req.body,
      projectId: project._id,
    };

    const newVisit = new Visit(payload);

    await newVisit.save();

    res.status(201).json({ message: "Visit tracked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to track visit", error });
  }
};
