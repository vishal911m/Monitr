import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please provide a title"],
      // unique: false,
    },

    description: {
      type: String,
      default: "No description"
    },

    dueDate: {
      type: String,
      default: Date.now(),
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
  },
  {timestamps: true}
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;