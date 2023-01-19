import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workouts/index";

const router: Router = Router();

router.get("/", getWorkouts);
router.post("/create-workout", createWorkout);
router.put("/update-workout/:id", updateWorkout);
router.delete("/delete-workout/:id", deleteWorkout);

export default router;
