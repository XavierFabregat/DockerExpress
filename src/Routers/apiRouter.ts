import { Router } from "express";
import UserController from "../Controllers/user.controller";

const apiRouter = Router();

apiRouter.get("/users", UserController.getUsers);
apiRouter.post("/users", UserController.postUser);

export default apiRouter;
