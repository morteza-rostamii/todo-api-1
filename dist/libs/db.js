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
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
global.mongoose = {
    conn: null,
    promise: null,
};
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (global.mongoose && global.mongoose.conn) {
            console.log('already connected!');
            return global.mongoose.conn;
        }
        else {
            const connectionStr = process.env.MONGO_URL || '';
            const promise = mongoose_1.default.connect(connectionStr, {
                autoIndex: true,
            });
            const db = mongoose_1.default.connection;
            db.on('error', () => {
                console.error.bind(console, 'connection error!');
            });
            db.once('open', () => console.log('connected!'));
            // saving connection in global object
            global.mongoose = {
                // get db connection
                conn: yield promise,
                promise,
            };
            console.log('new connection to mongo_atlas');
            // return connection
            return yield promise;
        }
    });
}
exports.dbConnect = dbConnect;
