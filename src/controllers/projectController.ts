import { Response } from "express";
import Project from "../models/projectModel";
import { ProjectRequest } from "../types/requestTypes";
import { generateApiKey } from "../utils/apiKeyGenerator";

export const createProject = async (req: ProjectRequest, res: Response) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const apiKey = generateApiKey();
    const newProject = new Project({ name, apiKey, userId });
    await newProject.save();

    res.status(201).json({ message: "Project created", apiKey });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

export const getProjects = async (req: ProjectRequest, res: Response) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};
