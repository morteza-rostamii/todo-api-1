import { Request, Response } from "express";
import { dbConnect } from "../../libs/db";
import Todo from "./todos.model";
import User from "../users/users.model";

const todosController = {

  async gets(req: Request, res: Response) {

    try {

      const todos = await Todo.find({}) 
        .populate('user').exec();

      return res.status(200).json({
        status: true,
        data: {
          todos,
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
        msg: 'no id'
      });
    }

    try {

      const todo = await Todo.findById(id)
        .populate('user')
        .exec();
      
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
      const todo = await new Todo({
        task: task,
        user: user._id,
      });

      await todo.save();

      user.todos.push(todo);
      user.save();

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
    const { task } = req.body;
    const {id} = req.params;

    try {
     
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { task },
        { new: true }
      )
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
    catch(error: any) {
      return res.status(400).json({
        status: false,
        msg: error?.message || error,
      });
    }
  },

  async delete(req: Request, res: Response) {
    const {id} = req.params;

    try {
      const deletedTodo = await Todo.findByIdAndDelete(id)
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
    catch(error: any) {
      return res.status(400).json({
        status: false,
        msg: error?.message || error,
      });
    }
  },
}

export default todosController