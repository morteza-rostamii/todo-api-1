"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("./users.controller"));
const router = express_1.default.Router();
// Get: /todos
router
    .route('/')
    .get(users_controller_1.default.gets);
// Get: /todos/:id
router
    .route('/:id')
    .get(users_controller_1.default.get);
// Post: /todos
router
    .route('/')
    .post(users_controller_1.default.create);
// Patch: /todos/:id
router
    .route('/:id')
    .patch(users_controller_1.default.update);
router
    .route('/:id')
    .delete(users_controller_1.default.delete);
exports.default = router;
