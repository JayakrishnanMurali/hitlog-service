import { Response } from "express";
import Project from "../models/projectModel";
import { ProjectRequest, RotateApiKeyRequest } from "../types/requestTypes";
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

    res.status(201).json({ message: "Project created" });
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

export const rotateApiKey = async (req: RotateApiKeyRequest, res: Response) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newApiKey = project.rotateApiKey();
    await project.save();

    res.status(200).json({ message: "API key invalidated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error invalidating API key", error });
  }
};
