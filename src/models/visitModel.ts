import mongoose, { Schema, Document } from "mongoose";

interface Visit {
  apiKey: string;
  visitorId: string;
  sessionId: string;
  page: string;
  referrer: string;
  device: string;
  location: {
    country: string;
    city: string;
  };
  timestamp: Date;
  duration: number;
  isBot: boolean;
}

export interface IVisit extends Visit, Document {}

export interface IVisitPlain extends Visit {}

const VisitSchema: Schema = new Schema({
  apiKey: { type: String, required: true },
  visitorId: { type: String, required: true },
  sessionId: { type: String, required: true },
  page: { type: String, required: true },
  referrer: { type: String, required: true },
  device: { type: String, required: true },
  location: {
    country: { type: String },
    city: { type: String },
  },
  timestamp: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  isBot: { type: Boolean, required: true },
});

export default mongoose.model<IVisit>("Visit", VisitSchema);
