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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// routes
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const todos_router_1 = __importDefault(require("./modules/todos/todos.router"));
const users_router_1 = __importDefault(require("./modules/users/users.router"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./libs/db");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// ---------static folder
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, body_parser_1.json)());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)({
    credentials: true,
    origin: '*',
    //origin: process.env.FRONT_END_URL 
}));
app.use((0, cookie_parser_1.default)());
// routes
app.use('/auth', auth_router_1.default);
app.use('/todos', todos_router_1.default);
app.use('/users', users_router_1.default);
// connect db
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.dbConnect)()
            .then(() => {
            app.listen(PORT, () => {
                console.log(`node server on ${PORT}`);
            });
        });
    });
}
connectToDb();
