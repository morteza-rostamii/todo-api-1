"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
router
    .route('/register')
    .post(auth_controller_1.default.register);
router
    .route('/verify')
    .post(auth_controller_1.default.verify);
router
    .route('/check-auth')
    .post(auth_controller_1.default.checkAuth);
router
    .route('/logout')
    .post(auth_controller_1.default.logout);
exports.default = router;
