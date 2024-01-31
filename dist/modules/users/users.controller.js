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
//import Todo from "./users.model";
const users_model_1 = __importDefault(require("../users/users.model"));
const usersController = {
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield users_model_1.default.find({})
                    .populate('user').exec();
                return res.status(200).json({
                    status: true,
                    data: {
                        users,
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
                    msg: 'no id',
                });
            }
            try {
                const user = yield users_model_1.default.findById(id)
                    .populate('todos')
                    .exec();
                if (!user) {
                    return res.status(410).json({
                        status: false,
                        msg: 'no such user',
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: {
                        user,
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
                const todo = yield new users_model_1.default({
                    task: task,
                    user: user._id,
                });
                todo.save();
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
            try {
                return res.status(200).json({
                    status: true,
                    data: {}
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
            try {
                return res.status(200).json({
                    status: true,
                    data: {}
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
exports.default = usersController;
