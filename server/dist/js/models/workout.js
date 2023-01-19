"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    exercise: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: false,
    },
    series: {
        type: Number,
        required: false,
    },
    repetitions: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    interval: {
        type: Number,
        required: false,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Workout", workoutSchema);
