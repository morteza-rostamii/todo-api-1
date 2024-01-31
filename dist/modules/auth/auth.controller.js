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
const users_model_1 = __importDefault(require("../users/users.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const otp_model_1 = __importDefault(require("../otp/otp.model"));
const const_1 = require("../../consts/const");
const authController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email } = req.body;
            if (!username || !email) {
                return res.status(200).json({
                    status: false,
                    error: 'Enter info',
                });
            }
            try {
                let otp = otp_generator_1.default.generate(6, {
                    upperCaseAlphabets: false,
                });
                // check: for duplicate otp in db
                let result = yield otp_model_1.default.findOne({ otp: otp });
                while (result) {
                    otp = otp_generator_1.default.generate(6, {
                        upperCaseAlphabets: false,
                    });
                    result = yield otp_model_1.default.findOne({ otp: otp });
                }
                // save otp in db
                const newOtp = yield otp_model_1.default.create({
                    email,
                    otp,
                });
                const user = yield users_model_1.default.findOne({ email: email });
                if (user) {
                    return res.status(200).json({
                        status: false,
                        user,
                        otp: newOtp.otp,
                    });
                }
                const newUser = yield new users_model_1.default({
                    username,
                    email,
                });
                newUser.save();
                return res.status(200).json({
                    status: true,
                    user: newUser,
                    otp: newOtp,
                });
            }
            catch (error) {
                return res.status(200).json({
                    status: false,
                    error: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const JWT_SECRET = process.env.JWT_SECRET || '';
            const { email, otp } = req.body;
            // create token and magic link
            if (!email || !otp) {
                return res.status(200).json({
                    status: false,
                    msg: 'Enter info'
                });
            }
            try {
                const user = yield users_model_1.default.findOne({ email });
                // verify the otp
                // Find the most recent OTP for the email
                const response = yield otp_model_1.default.find({ email }).sort({ createdAt: -1 }).limit(1);
                if (response.length === 0 || otp !== response[0].otp) {
                    return res.status(400).json({
                        status: false,
                        msg: 'The OTP is not valid',
                    });
                }
                const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '15m' });
                res.cookie(const_1.TOKEN, token, {
                    // Enforce HTTPS-only transmission
                    secure: process.env.NODE_ENV !== 'development',
                    // Optionally add other cookie options:
                    maxAge: 900000, // 15 minutes expiration
                    httpOnly: true // Inaccessible to client-side JavaScript
                });
                return res.status(200).json({
                    status: true,
                    data: {
                        token: token,
                        user,
                    },
                });
            }
            catch (error) {
                return res.status(200).json({
                    status: false,
                    error: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
    // check if token is still valid
    checkAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const JWT_SECRET = process.env.JWT_SECRET || '';
            try {
                // verify token
                const token = req.cookies[const_1.TOKEN];
                if (!token) {
                    return res.status(400).json({
                        status: false,
                        msg: 'no token in cookie',
                    });
                }
                // verify token
                jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
                    if (err) {
                        // remove cookie
                        res.clearCookie(const_1.TOKEN);
                        return res.status(401).json({
                            status: false,
                            msg: 'unauthorized',
                        });
                    }
                    return res.status(200).json({
                        status: true,
                        data: {
                            token,
                        },
                    });
                });
            }
            catch (error) {
                return res.status(200).json({
                    status: false,
                    error: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // remove cookie
                res.clearCookie(const_1.TOKEN);
                return res.status(200).json({
                    status: true,
                    msg: 'logout',
                });
            }
            catch (error) {
                return res.status(200).json({
                    status: false,
                    error: (error === null || error === void 0 ? void 0 : error.message) || error,
                });
            }
        });
    },
};
exports.default = authController;
