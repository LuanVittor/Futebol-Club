import { Request, Response, NextFunction } from 'express';

const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (password.length < 6) {
    return res.status(401).json({ message: 'Password must have at least 6 characters' });
  }

  return next();
};

export default validLogin;
