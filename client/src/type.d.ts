// This file will hold the types. And since I will use them on almost every file, I added the extension .d.ts to make the types globally available. And now we don't need to import them anymore.

interface IWorkout {
  _id: string;
  exercise: string;
  time: number;
  series: number;
  repetitions: number;
  weight: number;
  interval: number;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
interface WorkoutProps {
  workout: IWorkout;
}

type ApiDataType = {
  message: string;
  status: string;
  workouts: IWorkout[];
  workout?: IWorkout;
};
