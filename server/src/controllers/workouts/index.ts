import { Response, Request } from "express";
import { IWorkout } from "../../types/workout";
import Workout from "../../models/Workout";

interface IUser {
  id: string | number;
  // other properties of the user object
}

// const getWorkouts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const workouts: IWorkout[] = await Workout.find();
//     res.status(200).json({ workouts });
//   } catch (error) {
//     throw error;
//   }
// };

const getWorkouts = async (req: Request, res: Response): Promise<void> => {
  try {
    const workouts: IWorkout[] = await Workout.find();
    res.status(200).json({ workouts });
  } catch (error) {
    throw error;
  }
};

const createWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IWorkout,
      | "exercise"
      | "time"
      | "series"
      | "repetitions"
      | "weight"
      | "interval"
      | "status"
      | "user"
    >;
    const workout: IWorkout = new Workout({
      exercise: body.exercise,
      time: body.time,
      series: body.series,
      repetitions: body.repetitions,
      weight: body.weight,
      interval: body.interval,
      status: body.status,
      user: (req.user as IUser).id,
    });
    const newWorkout: IWorkout = await workout.save();
    const allWorkouts: IWorkout[] = await Workout.find();
    res.status(201).json({
      message: "Workout added",
      workout: newWorkout,
      workouts: allWorkouts,
    });
  } catch (error) {
    throw error;
  }
};

const updateWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatedWorkout: IWorkout | null = await Workout.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allWorkouts: IWorkout[] = await Workout.find();
    res.status(200).json({
      message: "Workout updated",
      workout: updatedWorkout,
      workouts: allWorkouts,
    });
  } catch (error) {
    throw error;
  }
};

const deleteWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedWorkout: IWorkout | null = await Workout.findByIdAndRemove(
      req.params.id
    );
    const allWorkouts: IWorkout[] = await Workout.find();
    res.status(200).json({
      message: "Workout deleted",
      workout: deletedWorkout,
      workouts: allWorkouts,
    });
  } catch (error) {
    throw error;
  }
};

export { getWorkouts, createWorkout, updateWorkout, deleteWorkout };
