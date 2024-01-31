"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    task: {
        type: String,
        required: [true, 'Enter an task'],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "User",
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
const Todo = mongoose_1.default.models.Todo || mongoose_1.default.model("Todo", TodoSchema);
exports.default = Todo;
