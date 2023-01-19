"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.updateWorkout = exports.createWorkout = exports.getWorkouts = void 0;
const workout_1 = __importDefault(require("../../models/workout"));
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workouts = yield workout_1.default.find();
        res.status(200).json({ workouts });
    }
    catch (error) {
        throw error;
    }
});
exports.getWorkouts = getWorkouts;
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const workout = new workout_1.default({
            exercise: body.exercise,
            time: body.time,
            series: body.series,
            repetitions: body.repetitions,
            weight: body.weight,
            interval: body.interval,
            status: body.status,
        });
        const newWorkout = yield workout.save();
        const allWorkouts = yield workout_1.default.find();
        res.status(201).json({
            message: "Workout added",
            workout: newWorkout,
            workouts: allWorkouts,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.createWorkout = createWorkout;
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updatedWorkout = yield workout_1.default.findByIdAndUpdate({ _id: id }, body);
        const allWorkouts = yield workout_1.default.find();
        res.status(200).json({
            message: "Workout updated",
            workout: updatedWorkout,
            workouts: allWorkouts,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateWorkout = updateWorkout;
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedWorkout = yield workout_1.default.findByIdAndRemove(req.params.id);
        const allWorkouts = yield workout_1.default.find();
        res.status(200).json({
            message: "Workout deleted",
            workout: deletedWorkout,
            workouts: allWorkouts,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteWorkout = deleteWorkout;
