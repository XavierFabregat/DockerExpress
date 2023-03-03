import { CustomResponse } from "../Lib/Response";
import { Request, Response } from "express";
import Todo from "../Models/Todos.model";
import User from "../Models/User.model";
import { v4 as uuidv4 } from "uuid";

class TodoController {
  static async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await Todo.findAll({
        include: User,
      }).then((todos) => {
        return todos;
      }).catch((error) => {
        throw new Error(`Error finding the todos : ${error}`);
      });

      if (todos.length === 0) {
        throw new Error("No todos found");
      }

      res.status(200).json(CustomResponse.success(todos));
    } catch (error) {
      console.log("🚀 ~ file: todo.controller.ts:24 ~ TodoController ~ getTodos ~ error:", error)
      if (error instanceof Error) {
        if (error.message === "No todos found") {
          res.status(404).json(CustomResponse.error(error, 404, error.message));
        } else if (error.message.includes("Error finding the todos")) {
          res.status(404).json(CustomResponse.error(error, 500, error.message));
        } else {
          res.status(500).json(CustomResponse.error(error));
        }
      }
    }
  }

  static async postTodo (req: Request, res: Response): Promise<void> {
    try {
      const { 
        title, 
        description, 
        userId 
      } = req.body as { title: string, description: string, userId: string };

      const id = uuidv4();

      const todo = await Todo.create({
        id,
        title,
        description,
        userId,
      }).then((todo) => {
        return todo;
      }).catch((error) => {
        throw new Error(`Error creating the todo : ${error}`);
      });

      res.status(200).json(CustomResponse.success(todo));
    } catch (error) {
      console.log("🚀 ~ file: todo.controller.ts:60 ~ TodoController ~ error:", error)
      if (error instanceof Error) {
        if (error.message.includes("Error creating the todo")) {
          res.status(409).json(CustomResponse.error(error, 500, error.message));
        } else {
          res.status(500).json(CustomResponse.error(error));
        }
      }
    }
  }
}

export default TodoController;

