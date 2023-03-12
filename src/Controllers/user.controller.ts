import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../Models/User.model";
import { CustomResponse } from "../Lib/Response";
import { Request, Response } from "express";
import Todo from "../Models/Todos.model";
import { postUserValidation, validateUpdatePasswords, validateUsername } from "../Lib/postUserValidation";
import { returnSafeUser, returnSafeUsers} from "../Lib/safeUser";

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({ 
        include: [{model: Todo, as: "todos"}],
      });
      res.status(200).json(CustomResponse.success(returnSafeUsers(users)));
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json(CustomResponse.error(error));
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
            .json(CustomResponse.error(error, 409, "Username already taken"));
        } else if (error.message === "Username and password are required") {
          res
            .status(400)
            .json(CustomResponse.error(error, 400, "Username and password are required"));
        } else if (error.message.includes("Error in input validation")) {
          res
            .status(403)
            .json(CustomResponse.error(error, 403, error.message));
        } else if (error.message === 'Passwords do not match') {
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
      const { updatedValue, id } = req.params as { updatedValue: string, id: string };

      const userToUpdate = await User.findByPk(id);

      if (!userToUpdate) {
        throw new Error("User not found");
      }

      if (updatedValue === 'password') {
        const { oldPassword, password, repeatPassword } = req.body as { username: string, password: string, repeatPassword: string, oldPassword?: string };

        if (!oldPassword) {

          // This is for the forgot password functionality!! (needs some fixing, since now with just the username you can change the password)

          if (!password || !repeatPassword) {
            throw new Error("Password and repeat password are required");
          }

          const inputValidation = validateUpdatePasswords(password, repeatPassword);

          if (!inputValidation.valid) {
            throw new Error(`Error in input validation : ${inputValidation.message}`);
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const updatedUser = await User.update(
            { password: hashedPassword },
            { where: { id } },
          ).then(async () => {
            const updatedUser = await User.findByPk(id, { include: [{model: Todo, as: "todos"}] });
            if (!updatedUser) {
              throw new Error("User not found after update");
            }
            return updatedUser;
          }).catch((error) => {
            throw new Error(`Error updating the user : ${error}`);
          });

          res.status(200).json(CustomResponse.success(returnSafeUser(updatedUser), "User updated successfully", 200));

        } else {
          // implement update with old password
        }
      }

      if (updatedValue === 'username') {
        
        const { newUsername } = req.body as { username: string, newUsername: string };

        if (!newUsername) {
          throw new Error("New username required");
        }

        const inputValidation = validateUsername(newUsername);

        if (!inputValidation.valid) {
          throw new Error(`Error in input validation : ${inputValidation.message}`);
        }

        const isUsernameTaken = await User.findOne({ where: { username: newUsername } });

        if (isUsernameTaken) {
          throw new Error("Username taken.");
        }


        const updatedUser = await User.update(
          { username: newUsername },
          { where: { id } },
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
          .status(200)
          .json(CustomResponse.success(
            returnSafeUser(updatedUser),
            "User updated successfully", 
            200
          ));

      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          res
            .status(404)
            .json(CustomResponse.error(error, 404));
        } else if (error.message === 'Password and repeat password are required') {
          res
            .status(400)
            .json(CustomResponse.error(error, 400, "Password and repeat password are required"));
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
            .json(CustomResponse.error(error, 409, "Username already taken"));
        } else if (error.message === 'New username required') {
          res
            .status(403)
            .json(CustomResponse.error(error, 403, "New username required"));
        } else {
           console.log("🚀 ~ file: user.controller.ts:211 ~ UserController ~ updateUser ~ error:", error)
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
        throw new Error(`Error while the user : ${error}`);
      });

      if (!user) {
        throw new Error("User not found");
      }

      await User.destroy({
        where: {
          id,
        },
      }).then(() => {
        res.status(200).json(CustomResponse.success(null, "User deleted successfully", 200));
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
          console.log("🚀 ~ file: user.controller.ts:300 ~ UserController ~ deleteUser ~ error:", error)
          res
            .status(500)
            .json(CustomResponse.error(error));
        }
      }
    }
  }
};

export default UserController;