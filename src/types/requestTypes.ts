import { Request } from "express";
import { IVisitPlain } from "../models/visitModel";

export interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface TrackRequest extends Request {
  body: IVisitPlain;
}

export interface UserRequest extends Request {
  user: {
    id: string;
  };
}

export interface ProjectRequest extends Request {
  user: {
    id: string;
  };
  body: {
    name: string;
  };
}
