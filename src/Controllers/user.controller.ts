import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../Models/User.model";
import { CustomResponse } from "../Lib/Response";
import { Request, Response } from "express";
import Todo from "../Models/Todos.model";
import { postUserValidation } from "../Lib/postUserValidation";
import { returnSafeUser, returnSafeUsers} from "../Lib/safeUser";

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({ 
        include: [{model: Todo, as: "todos"}],
      });
      if (users.length === 0) {
        throw new Error("No users found");
      }
      res.status(200).json(CustomResponse.success(returnSafeUsers(users)));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "No users found") {
         res
          .status(404)
          .json(CustomResponse.error(error, 404, error.message));
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
      const { username, password, repeatPassword } = req.body as { username: string, password: string, repeatPassword: string };

      if (!username || !password || !repeatPassword) {
        throw new Error("Username and password are required");
      };

      if (password !== repeatPassword) {
        throw new Error("Passwords do not match");
      }

      const inputValidation = postUserValidation(username, password, repeatPassword);

      if (!inputValidation.valid) {
        throw new Error(`Error in input validation : ${inputValidation.message}`);
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
        throw new Error("Username taken.");
      }

      const user = await User.create({
        id,
        username,
        password: hashedPassword,
      }).then(async () => {
        const newUser = await User.findByPk(id, {
          include: [{model: Todo, as: "todos"}]
        });
        if (!newUser) {
          throw new Error("User not found");
        }
        return newUser;
      }).catch((error) => {
        throw new Error(`Error creating the user : ${error}`);
      });

      res.status(201).json(CustomResponse.success(returnSafeUser(user), "User created successfully", 201));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Username taken.") {
          res
            .status(409)
            .json(CustomResponse.error(error, 409, "User already exists"));
        } else if (error.message === "Username and password are required") {
          res
            .status(400)
            .json(CustomResponse.error(error, 400, "Username and password are required"));
        } else if (error.message.includes("Error in input validation")) {
          res
            .status(403)
            .json(CustomResponse.error(error, 403, error.message));
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

      if (!user) {
        throw new Error("User not found");
      }

      res.status(200).json(CustomResponse.success(returnSafeUser(user)));
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

  static async updateUser(req: Request, res: Response) {
    try {
      const { updatedValue } = req.params as { updatedValue: string };
      if (updatedValue === 'password') {
        const { username, password, repeatPassword } = req.body as { username: string, password: string, repeatPassword: string };
        const userToUpdate = await User.findOne({ where: { username } });
        if (!userToUpdate) {
          throw new Error("User not found");
        }
        const inputValidation = postUserValidation(username, password, repeatPassword);

        if (!inputValidation.valid) {
          throw new Error(`Error in input validation : ${inputValidation.message}`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.update(
          { password: hashedPassword },
          { where: { username } },
        ).then(async () => {
          const updatedUser = await User.findOne({ where: { username }, include: [{model: Todo, as: "todos"}] });
          if (!updatedUser) {
            throw new Error("User not found after update");
          }
          return updatedUser;
        }).catch((error) => {
          throw new Error(`Error updating the user : ${error}`);
        });

        res.status(204).json(CustomResponse.success(returnSafeUser(updatedUser), "User updated successfully", 204));
      }

      if (updatedValue === 'username') {

        const { username, newUsername, id } = req.body as { username: string, newUsername: string, id: string };

        const isUsernameTaken = await User.findOne({ where: { username: newUsername } });

        if (isUsernameTaken) {
          throw new Error("Username taken.");
        }

        const doesUserExist = await User.findOne({ where: { username, id } });

        if (!doesUserExist) {
          throw new Error("User not found");
        }

        const updatedUser = await User.update(
          { username: newUsername },
          { where: { username, id } },
        ).then(async () => {
          const updatedUser = await User.findOne({ where: { username: newUsername }, include: [{model: Todo, as: "todos"}] });
          if (!updatedUser) {
            throw new Error("User not found after update");
          }
          return updatedUser;
        }).catch((error) => {
          throw new Error(`Error updating the user : ${error}`);
        });

        res
          .status(204)
          .json(CustomResponse.success(
            returnSafeUser(updatedUser),
            "User updated successfully", 
            204
          ));

      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          res
            .status(404)
            .json(CustomResponse.error(error, 404));
        } else if (error.message === "User not found after update") {
          res
            .status(404)
            .json(CustomResponse.error(error, 404));
        } else if (error.message.includes("Error in input validation")) {
          res
            .status(403)
            .json(CustomResponse.error(error, 403, error.message));
        } else if (error.message === "Username taken.") {
          res
            .status(409)
            .json(CustomResponse.error(error, 409, "Username taken"));
        } else {
          res
            .status(500)
            .json(CustomResponse.error(error));
        }
      }
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const user = await User.findOne({
        where: {
          id,
        },
      }).then((user) => {
        return user;
      }).catch((error) => {
        throw new Error(`Error finding the user : ${error}`);
      });

      if (!user) {
        throw new Error("User not found");
      }

      await User.destroy({
        where: {
          id,
        },
      }).then(() => {
        res.status(200).json(CustomResponse.success(null, "User deleted successfully", 204));
      }).catch((error) => {
        throw new Error(`Error deleting the user : ${error}`);
      });
    } catch (error) {
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