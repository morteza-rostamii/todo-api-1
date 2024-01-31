"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_controller_1 = __importDefault(require("./todos.controller"));
const authGuard_mid_1 = __importDefault(require("../../middlewares/authGuard.mid"));
const router = express_1.default.Router();
// Get: /todos
router
    .route('/')
    .get(authGuard_mid_1.default, todos_controller_1.default.gets);
// Get: /todos/:id
router
    .route('/:id')
    .get(todos_controller_1.default.get);
// Post: /todos
router
    .route('/')
    .post(todos_controller_1.default.create);
// Patch: /todos/:id
router
    .route('/:id')
    .put(todos_controller_1.default.update);
router
    .route('/:id')
    .delete(todos_controller_1.default.delete);
exports.default = router;
