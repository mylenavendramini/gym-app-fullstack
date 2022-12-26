import mongoose, { Document } from "mongoose";

export interface IWorkout extends Document {
  exercise: string;
  time: number;
  series: number;
  repetitions: number;
  weight: number;
  interval: number;
  status: boolean;
  user: mongoose.Types.ObjectId;
}
