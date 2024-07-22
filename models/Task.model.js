import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["To-do", "In-Progress", "Done", "Approved"],
            default: "To-do",
        },
        taskNumber: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;