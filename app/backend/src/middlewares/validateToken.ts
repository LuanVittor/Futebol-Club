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
    jwt.verify(token, await secret);
    return res.status(200).json('admin');
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default hasToken;
