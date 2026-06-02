import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  due_date?: Date;
  status: string;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this task."],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
    },
    due_date: {
      type: Date,
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default models.Task || model<ITask>("Task", TaskSchema);
