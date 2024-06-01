import User from "../models/userModel";
import { Request, Response } from "express";
import { UserRequest } from "../types/requestTypes";

export const getApiKey = async (req: UserRequest, res: Response) => {
  const userId = req?.user?.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ apiKey: user.apiKey });
  } catch (error) {
    res.status(500).json({ message: "Error getting API key", error });
  }
};
