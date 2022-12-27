import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workouts/index";
import {
  getLogin,
  postLogin,
  logout,
  getSignup,
  postSignup,
} from "../controllers/auth/auth";
import { ensureAuth, ensureGuest } from "../middleware/auth";

const router: Router = Router();

router.get("/", ensureAuth, getWorkouts);
router.post("/create-workout", createWorkout);
router.put("/update-workout/:id", updateWorkout);
router.delete("/delete-workout/:id", deleteWorkout);

// Auth:
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/logout", logout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

export default router;
