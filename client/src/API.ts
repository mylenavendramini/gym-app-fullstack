import axios, { AxiosResponse } from "axios";

export const baseUrl: string = "http://localhost:4001";

export const getWorkouts = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const workouts: AxiosResponse<ApiDataType> = await axios.get(baseUrl);
    return workouts;
  } catch (error) {
    throw error;
  }
};

export const createWorkout = async (
  formData: IWorkout
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const workout: Omit<IWorkout, "_id"> = {
      exercise: formData.exercise,
      time: formData.time,
      series: formData.series,
      repetitions: formData.repetitions,
      weight: formData.weight,
      interval: formData.interval,
      status: false,
    };
    const saveWorkout: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/create-workout",
      workout
    );
    return saveWorkout;
  } catch (error) {
    throw error;
  }
};

export const updateWorkout = async (
  workout: IWorkout
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const workoutUpdate: Pick<IWorkout, "status"> = { status: true };
    const updatedWorkout: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/update-workout/${workout._id}`,
      workoutUpdate
    );
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkout = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedWorkout: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-workout/${_id}`
    );
    return deletedWorkout;
  } catch (error) {
    throw error;
  }
};
