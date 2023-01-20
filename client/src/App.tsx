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
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App: React.FC = () => {
  // Workouts:
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

  // Auth:

  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(undefined);

  const logOut = () => {
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

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
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
