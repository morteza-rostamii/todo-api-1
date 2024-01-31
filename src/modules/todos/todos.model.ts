
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Enter an task'],
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo