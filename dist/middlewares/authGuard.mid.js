"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../consts/const");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authGuard(req, res, next) {
    const token = req.cookies[const_1.TOKEN]; // Replace with your actual cookie name
    const JWT_SECRET = process.env.JWT_SECRET || '';
    console.log('****boob', JWT_SECRET);
    console.log('------------', token);
    if (!token) {
        // Token not provided, or cookie not found
        return res.status(401).json({
            status: false,
            msg: 'Unauthorized'
        });
    }
    if (!JWT_SECRET)
        return res.status(500).json({
            status: false,
            msg: 'server error'
        });
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            // Token verification failed
            // Optionally, you can clear the token cookie here
            res.clearCookie(const_1.TOKEN); // Replace with your actual cookie name
            return res.status(401).json({
                status: false,
                msg: 'Unauthorized-- token has expired!'
            });
        }
        // Token is valid, you can access decoded data in `decoded` variable
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    });
}
exports.default = authGuard;
