import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import {json} from 'body-parser'
import { dot } from 'node:test/reporters';
import cookieParser from 'cookie-parser'

// routes
import authRouter from './modules/auth/auth.router';
import todosRouter from './modules/todos/todos.router';
import usersRouter from './modules/users/users.router';

import path from 'path';
import { dbConnect } from './libs/db';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// ---------static folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(json());
app.use(express.urlencoded());
app.use(cors({ 
  credentials: true, 
  origin: '*',
  //origin: process.env.FRONT_END_URL 
}));
app.use(cookieParser());

// routes
app.use('/auth', authRouter);
app.use('/todos', todosRouter);
app.use('/users', usersRouter);


// connect db
async function connectToDb() {
  const db = await dbConnect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`node server on ${PORT}`);
      });
    });
}
connectToDb();
