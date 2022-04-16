import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as rf from 'fs/promises';

const hasToken = async (req: Request, res: Response, _next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const secret = rf.readFile('jwt.evaluation.key', 'utf-8');
    const result = jwt.verify(token, await secret);
    req.body = { ...req.body, result };
    return res.status(200).json(req.body.result.role);
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default hasToken;
