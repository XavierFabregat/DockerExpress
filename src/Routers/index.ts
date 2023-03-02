import { Router } from "express";
import apiRouter from "./apiRouter";

const router = Router();

router.use('/api', apiRouter);

router.use('*', (req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default router;