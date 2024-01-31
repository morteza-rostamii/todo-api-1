
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter an username'],
    unique: true,
    trim: true,
    maxLength: [40, 'Username can not be more than 40 chars'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Editor', 'Visitor']
  },
  todos: {
    type: [{type: mongoose.Schema.Types.ObjectId,  ref: 'Todo'}],
    default: [],
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

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User