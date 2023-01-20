// import { Response, Request } from "express";
// import {
//   IWorkouts,
//   IWorkoutParent,
//   UserDocumentOverrides,
// } from "../../types/parent";
// import WorkoutParentModel from "../../models/workout";

// const getWorkout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const workout: IWorkoutParent[] = await WorkoutParentModel.find();
//     res.status(200).json({ workout });
//   } catch (error) {
//     throw error;
//   }
// };

// // const getWorkouts = async (req: Request, res: Response): Promise<void> => {
// //   try {
// //     const workouts: IWorkout[] = await Workout.find();
// //     res.status(200).json({ workouts });
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// const createWorkout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const parentBody = req.body as Pick<IWorkoutParent, "name">;
//     const body = req.body as Pick<
//       IWorkouts,
//       | "exercise"
//       | "time"
//       | "sets"
//       | "repetitions"
//       | "weight"
//       | "interval"
//       | "status"
//     >;
//     const workout: Omit<IWorkoutParent, "name" | "workouts"> =
//       new WorkoutParentModel({
//         name: parentBody.name,
//         workouts: {
//           // _id: "0".repeat(24),
//           exercise: body.exercise,
//           time: body.time,
//           sets: body.sets,
//           repetitions: body.repetitions,
//           weight: body.weight,
//           interval: body.interval,
//           status: body.status,
//         },
//       });
//     const newWorkout: IWorkoutParent = await workout.save();
//     const allWorkouts: IWorkoutParent[] = await WorkoutParentModel.find();
//     res.status(201).json({
//       message: "Workout added",
//       workout: newWorkout,
//       workouts: allWorkouts,
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// const updateWorkout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       params: { id },
//       body,
//     } = req;
//     const updatedWorkout: IWorkout | null = await Workout.findByIdAndUpdate(
//       { _id: id },
//       body
//     );
//     const allWorkouts: IWorkout[] = await Workout.find();
//     res.status(200).json({
//       message: "Workout updated",
//       workout: updatedWorkout,
//       workouts: allWorkouts,
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteWorkout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deletedWorkout: IWorkout | null = await Workout.findByIdAndRemove(
//       req.params.id
//     );
//     const allWorkouts: IWorkout[] = await Workout.find();
//     res.status(200).json({
//       message: "Workout deleted",
//       workout: deletedWorkout,
//       workouts: allWorkouts,
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// export { getWorkouts, createWorkout, updateWorkout, deleteWorkout };
