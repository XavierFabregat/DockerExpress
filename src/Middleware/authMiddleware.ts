import { Request, Response, NextFunction } from 'express';

async function authMiddleware (req: Request,res: Response, next: NextFunction) {
  next(); // TODO: Implement auth middleware
}