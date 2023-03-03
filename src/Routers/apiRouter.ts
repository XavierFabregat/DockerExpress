import { Router } from "express";
import UserController from "../Controllers/user.controller";
import TodoController from "../Controllers/todo.controller";

const apiRouter = Router();


// User routes 

apiRouter.get("/users", UserController.getUsers);
apiRouter.post("/users", UserController.postUser);
apiRouter.get("/users/:id", UserController.getUserById);


// Todo routes

apiRouter.get("/todos", TodoController.getTodos);
apiRouter.post("/todos", TodoController.postTodo);

export default apiRouter;
