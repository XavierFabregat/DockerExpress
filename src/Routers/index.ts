import { Router } from "express";
import apiRouter from "./apiRouter";
import { ViewsController } from "../Controllers/views.controller";

const router = Router();

router.get('/', ViewsController.renderIndex);

router.use('/api', apiRouter);

router.use('*', (req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default router;