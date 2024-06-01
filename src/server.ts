import mongoose from "mongoose";
import { config } from "./config";
import app from "./app";

// Mongoose Connection
mongoose
  .connect(config.MONGO_URI)
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
