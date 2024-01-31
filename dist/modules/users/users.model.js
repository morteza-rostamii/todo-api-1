"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Todo' }],
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
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
exports.default = User;
