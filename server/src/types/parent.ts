// // Setup
// import { Types, Model } from "mongoose";

// export interface IWorkout extends Document {
//   exercise: string;
//   time: number;
//   series: number;
//   repetitions: number;
//   weight: number;
//   interval: number;
//   status: boolean;
// }

// // Subdocument definition
// export interface IWorkouts {
//   _id: Types.ObjectId;
//   exercise: string;
//   time: number;
//   sets: number;
//   repetitions: number;
//   weight: number;
//   interval: number;
//   status: boolean;
// }

// // Document definition
// export interface IWorkoutParent {
//   name: string;
//   workouts: IWorkouts;
// }

// // Define property overrides for hydrated documents
// export type UserDocumentOverrides = {
//   workouts: Types.Subdocument<Types.ObjectId> & IWorkouts;
// };

// // Models and schemas
// export type WorkoutParentModelType = Model<
//   IWorkoutParent,
//   {},
//   UserDocumentOverrides
// >;
