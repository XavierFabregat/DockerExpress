import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../Models/User.model";
import { CustomResponse } from "../Lib/Response";
import { Request, Response } from "express";
import Todo from "../Models/Todos.model";

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({ 
        include: [{model: Todo, as: "todos"}]
      });
      if (users.length === 0) {
        throw new Error("No users found");
      }
      res.status(200).json(CustomResponse.success(users));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "No users found") {
         res
          .status(404)
          .json(CustomResponse.error(error, 404));
        } else {
          res
            .status(500)
            .json(CustomResponse.error(error));
        }
      }
    }
  }

  static async postUser (req: Request, res: Response) {
    try {
      const { username, password } = req.body as { username: string, password: string };

      if (!username || !password) {
        throw new Error("Username and password are required");
      };

      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      const doesUserExist = await User.findOne({
        where: {
          username,
        },
      }).then((user) => {
        return user;
      }).catch((error) => {
        throw new Error(`Error finding the user : ${error}`);
      });

      if (doesUserExist) {
        throw new Error("User already exists");
      }

      const user = await User.create({
        id,
        username,
        password: hashedPassword,
      }).then(async () => {
        const newUser = await User.findByPk(id, {
          include: [{model: Todo, as: "todos"}]
        });
        return newUser;
      }).catch((error) => {
        throw new Error(`Error creating the user : ${error}`);
      });

      res.status(201).json(CustomResponse.success(user, "User created successfully", 201));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User already exists") {
          res
            .status(409)
            .json(CustomResponse.error(error, 409, "User already exists"));
        } else if (error.message === "Username and password are required") {
          res
            .status(400)
            .json(CustomResponse.error(error, 400, "Username and password are required"));
        } else {
          res
            .status(500)
            .json(CustomResponse.error(error, 500, error.message));
        }
      }
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const user = await User.findOne({
        where: {
          id,
        },
        include: [{model: Todo, as: "todos"}],
      }).then((user) => {
        return user;
      }).catch((error) => {
        throw new Error(`Error finding the user : ${error}`);
      });

      console.log(user);

      if (!user) {
        throw new Error("User not found");
      }

      res.status(200).json(CustomResponse.success(user));
    } catch (error) {
      console.log("🚀 ~ file: user.controller.ts:99 ~ UserController ~ getOneUser ~ error:", error)
      if (error instanceof Error) {
        if (error.message === "User not found") {
          res
            .status(404)
            .json(CustomResponse.error(error, 404));
        } else {
          res
            .status(500)
            .json(CustomResponse.error(error));
        }
      }
    }
  }
};

export default UserController;