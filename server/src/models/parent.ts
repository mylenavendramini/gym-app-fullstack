// // Setup
// import { Schema, model, Types } from "mongoose";
// import {
//   IWorkouts,
//   IWorkoutParent,
//   WorkoutParentModelType,
// } from "../types/parent";

// const WorkoutParentSchema = new Schema<IWorkoutParent, WorkoutParentModelType>({
//   name: String,
//   workouts: new Schema<IWorkouts>(
//     {
//       exercise: {
//         type: String,
//         required: true,
//       },
//       time: {
//         type: Number,
//         required: false,
//       },
//       sets: {
//         type: Number,
//         required: false,
//       },
//       repetitions: {
//         type: Number,
//         required: false,
//       },
//       weight: {
//         type: Number,
//         required: false,
//       },
//       interval: {
//         type: Number,
//         required: false,
//       },
//       status: {
//         type: Boolean,
//         required: true,
//       },
//     },
//     { timestamps: true }
//   ),
// });

// export const WorkoutParentModel = model<IWorkoutParent, WorkoutParentModelType>(
//   "WorkoutParent",
//   WorkoutParentSchema
// );

// // Create a new document:
// const doc = new WorkoutParentModel({
//   workouts: { _id: "0".repeat(24), exercise: "foo" },
// });
// doc.workouts.ownerDocument(); // Works, `workouts` is a subdocument!
