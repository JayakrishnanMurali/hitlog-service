import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  name: string;
  apiKey: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.model<IProject>("Project", ProjectSchema);
