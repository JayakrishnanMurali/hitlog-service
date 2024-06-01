import mongoose from "mongoose";
import { config } from "./config";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const mongoURI = process.env.MONGO_URI || "";
// Mongoose Connection
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoDB connected");
    const PORT = config.port || 8080;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
