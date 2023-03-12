import { Router } from "express";
import UserController from "../Controllers/user.controller";
import TodoController from "../Controllers/todo.controller";

const apiRouter = Router();


// User routes 

apiRouter.get("/users", UserController.getUsers);
apiRouter.post("/users", UserController.postUser);
apiRouter.get("/users/:id", UserController.getUserById);
apiRouter.patch("/users/:id/:updatedValue", UserController.updateUser);
apiRouter.delete("/users/:id", UserController.deleteUser);


// Todo routes

apiRouter.get("/todos", TodoController.getTodos);
apiRouter.post("/todos", TodoController.postTodo);
apiRouter.get("/todos/:id", TodoController.getTodoById);
apiRouter.patch("/todos/:id", TodoController.updateTodo);
apiRouter.delete("/todos/:id", TodoController.deleteTodo);
apiRouter.patch("/todos/:id/complete", TodoController.completeTodo)

export default apiRouter;
