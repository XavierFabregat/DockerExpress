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
        include: Todo
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
      }).then((user) => {
        return user;
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
        } else {
          res
            .status(500)
            .json(CustomResponse.error(error, 500, error.message));
        }
      }
    }
  }
};

export default UserController;