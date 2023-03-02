import User from "../Models/User.model";
import { CustomResponse } from "../Lib/Response";
import { Request, Response } from "express";

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
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
};

export default UserController;