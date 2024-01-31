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
const mongoose_1 = __importDefault(require("mongoose"));
const OtpSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
// email sender
function sendVerificationEmail(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Email sent successfully: ");
        }
        catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }
    });
}
OtpSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("New document saved to the database");
        // Only send an email when a new document is created
        if (this.isNew) {
            yield sendVerificationEmail(this.email, this.otp);
        }
        next();
    });
});
const Otp = mongoose_1.default.models.Otp || mongoose_1.default.model("Otp", OtpSchema);
exports.default = Otp;
