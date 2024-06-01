import { Request, Response } from "express";
import Visit from "../models/visitModel";
import User from "../models/userModel";

export const getMetrics = async (req: Request, res: Response) => {
  const apiKey = req.header("x-api-key");

  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    const totalVisits = await Visit.countDocuments({ apiKey });
    const uniqueVisitorsArray = await Visit.distinct("visitorId", { apiKey });
    const uniqueVisitors = uniqueVisitorsArray.length;

    const totalPageViewsArray = await Visit.aggregate([
      { $match: { apiKey } },
      { $group: { _id: "$page", count: { $sum: 1 } } },
    ]);
    const totalPageViews = totalPageViewsArray.length;

    const topPages = await Visit.aggregate([
      { $match: { apiKey } },
      { $group: { _id: "$page", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const topSources = await Visit.aggregate([
      { $match: { apiKey } },
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const locations = await Visit.aggregate([
      { $match: { apiKey } },
      { $group: { _id: "$location.country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const devices = await Visit.aggregate([
      { $match: { apiKey } },
      { $group: { _id: "$device", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const botVisits = await Visit.countDocuments({ apiKey, isBot: true });

    res.status(200).json({
      totalVisits,
      uniqueVisitors,
      totalPageViews,
      topPages,
      topSources,
      locations,
      devices,
      botVisits,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving metrics", error });
  }
};
