import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: 8080,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
  MONGO_URI: process.env.MONGO_URI!,
};
