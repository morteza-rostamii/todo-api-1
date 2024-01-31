import { Request, Response } from "express";
import { dbConnect } from "../../libs/db";
//import Todo from "./users.model";
import User from "../users/users.model";

const usersController = {

  async gets(req: Request, res: Response) {

    try {

      const users = await User.find({}) 
        .populate('user').exec();

      return res.status(200).json({
        status: true,
        data: {
          users,
        }
      });
    }
    catch(error: any) {
      return res.status(400).json({
        status: false,
        msg: error?.message || error,
      });
    }
  },

  async get(req: Request, res: Response) {
    const {id} = req.params;

    if (!id) {
      return res.status(401).json({
        status: false,
        msg: 'no id',
      });
    }

    try {
      
      const user = await User.findById(id)
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
    catch(error: any) {
      return res.status(400).json({
        status: false,
        msg: error?.message || error,
      });
    }
  },

  async create(req: Request, res: Response) {
    const {task, email} = req.body;

    if (!task || !email) {
      return res.status(401).json({
        status: false,
        msg: 'Enter a task'
      });
    }

    try {

      // find user
      const user = await User.findOne({email});

      if (!user) {
        return res.status(401).json({
          status: false,
          msg: 'no such user.'
        });
      }

      // create to do
      const todo = await new User({
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
    catch(error: any) {
      return res.status(400).json({
        status: false,
        msg: error?.message || error,
      });
    }
  },

  async update(req: Request, res: Response) {

    try {

      return res.status(200).json({
        status: true,
        data: {
          
        }
      });
    }
    catch(error: any) {
      return res.status(400).json({
        status: false,
        msg: error?.message || error,
      });
    }
  },

  async delete(req: Request, res: Response) {

    try {

      return res.status(200).json({
        status: true,
        data: {
          
        }
      });
    }
    catch(error: any) {
      return res.status(400).json({
        status: false,
        msg: error?.message || error,
      });
    }
  },
}

export default usersController