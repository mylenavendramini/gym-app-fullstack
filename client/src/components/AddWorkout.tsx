import React, { useState } from "react";

type Props = {
  saveWorkout: (e: React.FormEvent, formData: IWorkout | any) => void;
};

const AddWorkout: React.FC<Props> = ({ saveWorkout }) => {
  const [formData, setFormData] = useState<IWorkout | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(e) => saveWorkout(e, formData)}>
      <div>
        <div>
          <label htmlFor="exercise">
            <p>Exercise</p>
          </label>
          <input onChange={handleForm} type="text" id="exercise" />
        </div>
        <div>
          <label htmlFor="time">
            {" "}
            <p>Time</p>
          </label>
          <input onChange={handleForm} type="number" id="time" />
        </div>
        <div>
          <label htmlFor="series">
            <p>Series</p>
          </label>
          <input onChange={handleForm} type="number" id="series" />
        </div>
        <div>
          <label htmlFor="repetitions">
            <p>Repetitions</p>
          </label>
          <input onChange={handleForm} type="number" id="repetitions" />
        </div>

        <div>
          <label htmlFor="weight">
            <p>Weight</p>
          </label>
          <input onChange={handleForm} type="number" id="weight" />
        </div>
        <div>
          <label htmlFor="interval">
            <p>Interval</p>
          </label>
          <input onChange={handleForm} type="number" id="interval" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>
        Add Workout
      </button>
    </form>
  );
};

export default AddWorkout;
