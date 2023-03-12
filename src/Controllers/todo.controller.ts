import { CustomResponse } from "../Lib/Response";
import { Request, Response } from "express";
import Todo from "../Models/Todos.model";
import User from "../Models/User.model";
import { v4 as uuidv4 } from "uuid";
import { safeTodo, safeTodos } from "../Lib/safeTodo";

class TodoController {
  static async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await Todo.findAll({
        include: [{model: User, as: "user"}],
      }).then((todos) => {
        return todos;
      }).catch((error) => {
        throw new Error(`Error finding the todos : ${error}`);
      });

      res.status(200).json(CustomResponse.success(safeTodos(todos)));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Error finding the todos")) {
          res.status(404).json(CustomResponse.error(error, 500, error.message));
        } else {
          console.log("🚀 ~ file: todo.controller.ts:24 ~ TodoController ~ getTodos ~ error:", error)
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

      if (!title || !description || !userId) {
        throw new Error("Title, description and userId are required");
      };

      const doesUserExist = await User.findByPk(userId).then((user) => {
        return user;
      }).catch((error) => {
        throw new Error(`Error finding the user : ${error}`);
      });

      if (!doesUserExist) {
        throw new Error("User does not exist");
      }

      const id = uuidv4();

      const todo = await Todo.create({
        id,
        title,
        description,
        completed: false,
        userId,
      }).then(async (todo) => {

        const todoCreated = await Todo.findByPk(todo.id,{
          include: [{model: User, as: "user"}],
        });

        if (!todoCreated) {
          throw new Error("Error finding the todo after its creation");
        }
        return todoCreated;

      }).catch((error) => {
        throw new Error(`Error creating the todo : ${error}`);
      });

      res.status(200).json(CustomResponse.success(safeTodo(todo)));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Error creating the todo")) {
          res.status(409).json(CustomResponse.error(error, 500, error.message));
        } else if (error.message === "User does not exist") {
          res.status(404).json(CustomResponse.error(error, 404, error.message));
        } else if (error.message === "Title, description and userId are required") {
          res.status(400).json(CustomResponse.error(error, 400, error.message));
        } else if (error.message.includes("Error finding the user")) {
          res.status(404).json(CustomResponse.error(error, 500, error.message));
        } else {
          console.log("🚀 ~ file: todo.controller.ts:60 ~ TodoController ~ error:", error)
          res.status(500).json(CustomResponse.error(error));
        }
      }
    }
  }

  static async getTodoById (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };

      const todo = await Todo.findByPk(id, {
        include: [{model: User, as: "user"}],
      }).then((todo) => {
        return todo;
      }).catch((error) => {
        throw new Error(`Error finding the todo : ${error}`);
      });

      if (!todo) {
        throw new Error("Todo does not exist");
      }

      res.status(200).json(CustomResponse.success(safeTodo(todo)));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Error finding the todo")) {
          res.status(404).json(CustomResponse.error(error, 500, error.message));
        } else if (error.message === "Todo does not exist") {
          res.status(404).json(CustomResponse.error(error, 404, error.message));
        } else {
          console.log("🚀 ~ file: todo.controller.ts:106 ~ TodoController ~ getTodo ~ error:", error)
          res.status(500).json(CustomResponse.error(error));
        }
      }
    }
  }

  static async updateTodo (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const { title, description, completed } = req.body as { title: string, description: string, completed: boolean };

      if (!title && !description && !completed) {
        throw new Error("Either a title, description or completed is required");
      }

      const todo = await Todo.findByPk(id).then((todo) => {
        return todo;
      }).catch((error) => {
        throw new Error(`Error finding the todo : ${error}`);
      });

      if (!todo) {
        throw new Error("Todo does not exist");
      }

      const todoUpdated = await Todo.update({
        title: title || todo.title,
        description: description || todo.description,
        completed: completed || false,
      }, {
        where: {
          id,
        },
      }).then(async () => {

        const todoUpdated = await Todo.findByPk(id, {
          include: [{model: User, as: "user"}],
        });

        if (!todoUpdated) {
          throw new Error("Error updating the todo");
        }
        return todoUpdated;

      }).catch((error) => {
        throw new Error(`Error updating the todo : ${error}`);
      });

      res.status(200).json(CustomResponse.success(safeTodo(todoUpdated), "Todo updated successfully"));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Todo does not exist") {
          res.status(404).json(CustomResponse.error(error, 404, error.message));
        } else if (error.message === 'Either a title, description or completed is required') {
          res.status(403).json(CustomResponse.error(error, 403, error.message));
        } else {
          console.log("🚀 ~ file: todo.controller.ts:161 ~ TodoController ~ updateTodo ~ error:", error)
          res.status(500).json(CustomResponse.error(error));
        }
      }
    }
  }

  static async deleteTodo (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };

      const todo = await Todo.findByPk(id).then((todo) => {
        return todo;
      }).catch((error) => {
        throw new Error(`Error finding the todo : ${error}`);
      });

      if (!todo) {
        throw new Error("Todo does not exist");
      }

      const todoDeleted = await Todo.destroy({
        where: {
          id,
        },
      }).then((todo) => {
        return todo;
      }).catch((error) => {
        throw new Error(`Error deleting the todo : ${error}`);
      });

      if (!todoDeleted) {
        throw new Error("Error deleting the todo");
      }

      res.status(200).json(CustomResponse.success(null, "Todo deleted successfully", 200));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Error deleting the todo")) {
          res.status(404).json(CustomResponse.error(error, 500, error.message));
        } else if (error.message === "Todo does not exist") {
          res.status(404).json(CustomResponse.error(error, 404, error.message));
        } else {
          console.log("🚀 ~ file: todo.controller.ts:166 ~ TodoController ~ deleteTodo ~ error:", error)
          res.status(500).json(CustomResponse.error(error));
        }
      }
    }
  }

  static async completeTodo (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };

      const todo = await Todo.findByPk(id).then((todo) => {
        return todo;
      }).catch((error) => {
        throw new Error(`Error finding the todo : ${error}`);
      });

      if (!todo) {
        throw new Error("Todo does not exist");
      }

      const todoCompleted = await Todo.update({
        completed: true,
      }, {
        where: {
          id,
        },
      }).then((todo) => {
        const todoCompleted = Todo.findByPk(id, {
          include: [{model: User, as: "user"}],
        });
        if (!todoCompleted) {
          throw new Error('Error finding the todo after update')
        }
        return todoCompleted;
      }).catch((error) => {
        throw new Error(`Error completing the todo : ${error}`);
      });

      if (!todoCompleted) {
        throw new Error("Error completing the todo");
      }

      res.status(200).json(CustomResponse.success(safeTodo(todoCompleted), "Todo completed successfully"));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Todo does not exist") {
          res.status(404).json(CustomResponse.error(error, 404, error.message));
        } else {
          console.log("🚀 ~ file: todo.controller.ts:165 ~ TodoController ~ completeTodo ~ error:", error)
          res.status(500).json(CustomResponse.error(error));
        }
      }
    }
  }
}

export default TodoController;


