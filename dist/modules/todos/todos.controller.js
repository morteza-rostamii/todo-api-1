"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todos_model_1 = __importDefault(require("./todos.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const todosController = {
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield todos_model_1.default.find({})
                    .populate('user').exec();
                return res.status(200).json({
                    status: true,
                    data: {
                        todos,
                    }
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: false,
                    msg: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(401).json({
                    status: false,
                    msg: 'no id'
                });
            }
            try {
                const todo = yield todos_model_1.default.findById(id)
                    .populate('user')
                    .exec();
                return res.status(200).json({
                    status: true,
                    data: {
                        todo,
                    }
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: false,
                    msg: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { task, email } = req.body;
            if (!task || !email) {
                return res.status(401).json({
                    status: false,
                    msg: 'Enter a task'
                });
            }
            try {
                // find user
                const user = yield users_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(401).json({
                        status: false,
                        msg: 'no such user.'
                    });
                }
                // create to do
                const todo = yield new todos_model_1.default({
                    task: task,
                    user: user._id,
                });
                yield todo.save();
                user.todos.push(todo);
                user.save();
                return res.status(200).json({
                    status: true,
                    data: {
                        todo,
                    }
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: false,
                    msg: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { task } = req.body;
            const { id } = req.params;
            try {
                const updatedTodo = yield todos_model_1.default.findByIdAndUpdate(id, { task }, { new: true })
                    .populate('user').exec();
                if (!updatedTodo) {
                    return res.status(404).json({ error: 'Todo not found' });
                }
                return res.status(200).json({
                    status: true,
                    data: {
                        updatedTodo,
                    }
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: false,
                    msg: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedTodo = yield todos_model_1.default.findByIdAndDelete(id)
                    .populate('user')
                    .exec();
                if (!deletedTodo) {
                    return res.status(404).json({ error: 'Todo not found' });
                }
                return res.status(200).json({
                    status: true,
                    data: {
                        deletedTodo,
                    }
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: false,
                    msg: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
};
exports.default = todosController;
