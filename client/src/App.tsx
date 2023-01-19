import React, { useEffect, useState } from "react";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "./API";
import "./App.css";
import AddWorkout from "./components/AddWorkout";
import WorkoutItem from "./components/WorkoutItem";

const App: React.FC = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = () => {
    getWorkouts()
      .then(({ data: { workouts } }: IWorkout[] | any) => setWorkouts(workouts))
      .catch((error: Error) => console.log(error));
  };

  const handleSaveWorkout = (e: React.FormEvent, formData: IWorkout): void => {
    e.preventDefault();
    createWorkout(formData)
      .then(({ status, data: { workouts } }) => {
        if (status !== 201) {
          throw new Error("Error! Workout not saved!");
        }
        setWorkouts(workouts);
      })
      .catch((error: Error) => console.log(error));
  };
  const handleUpdateWorkout = (workout: IWorkout): void => {
    updateWorkout(workout)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Workout not updated!");
        }
        setWorkouts(data.workouts);
      })
      .catch((error: Error) => console.log(error));
  };
  const handleDeleteWorkout = (_id: string): void => {
    deleteWorkout(_id)
      .then(({ status, data: { workouts } }) => {
        if (status !== 200) {
          throw new Error("Error! Workout not deleted");
        }
        setWorkouts(workouts);
      })
      .catch((error: Error) => console.log(error));
  };
  return (
    <main className="App">
      <h1>Gym APP</h1>
      <AddWorkout saveWorkout={handleSaveWorkout} />
      {workouts.map((workout: IWorkout) => (
        <WorkoutItem
          key={workout._id}
          updateWorkout={handleUpdateWorkout}
          deleteWorkout={handleDeleteWorkout}
          workout={workout}
        />
      ))}
    </main>
  );
};

export default App;
