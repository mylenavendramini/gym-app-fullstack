import { model, Schema } from "mongoose";
import { IWorkout } from "../types/workout";

const workoutSchema: Schema = new Schema(
  {
    exercise: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: false,
    },
    series: {
      type: Number,
      required: false,
    },
    repetitions: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    interval: {
      type: Number,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IWorkout>("Workout", workoutSchema);
