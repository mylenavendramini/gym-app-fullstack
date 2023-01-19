import React from "react";

type Props = WorkoutProps & {
  updateWorkout: (workout: IWorkout) => void;
  deleteWorkout: (_id: string) => void;
};

const WorkoutItem: React.FC<Props> = ({
  workout,
  updateWorkout,
  deleteWorkout,
}) => {
  const checkWorkout: string = workout.status ? `line-through` : "";

  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkWorkout}>{workout.exercise.toLowerCase()} </h1>
        <h1 className={checkWorkout}>
          {workout.time} {workout.time ? ` '` : ""}
        </h1>
        <h1 className={checkWorkout}>
          {workout.series} {workout.series ? " series" : ""}
        </h1>
        <h1 className={checkWorkout}>
          {workout.repetitions} {workout.repetitions ? " rep" : ""}
        </h1>
        <h1 className={checkWorkout}>
          {workout.weight} {workout.weight ? " kg" : ""}
        </h1>
        <h1 className={checkWorkout}>
          {workout.interval} {workout.interval ? ` ''` : ""}
        </h1>
      </div>

      <div className="Card--button">
        <button
          onClick={() => updateWorkout(workout)}
          className={workout.status ? "hide-button" : "fa fa-check"}
        ></button>

        <button
          onClick={() => deleteWorkout(workout._id)}
          className="fa fa-trash del"
        ></button>
      </div>
    </div>
  );
};

export default WorkoutItem;
