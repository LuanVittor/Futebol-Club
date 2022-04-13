import { Request, Response, NextFunction } from 'express';

const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: { "message": "All fields must be filled" } });
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(401).json({ error: { "message": 'Invalid email or password' } });
  }

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return res.status(401).json({ error: { "message": 'Invalid email' }});
  }

  if (password.length < 6) {
    return res.status(401).json({ error: { "message": 'Password must have at least 6 characters'}});
  }

  return next();
}

export default validLogin;