import mongoose, { Schema, Document } from "mongoose";
import { generateApiKey } from "../utils/apiKeyGenerator";

interface IProject extends Document {
  name: string;
  apiKey: string;
  userId: mongoose.Schema.Types.ObjectId;
  rotateApiKey: () => string;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

ProjectSchema.methods.rotateApiKey = function () {
  const newApiKey = generateApiKey();
  this.apiKey = newApiKey;
  return newApiKey;
};

export default mongoose.model<IProject>("Project", ProjectSchema);
