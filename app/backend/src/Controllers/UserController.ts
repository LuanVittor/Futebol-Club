import { Request, Response } from 'express';
import loginPayload from '../interfaces/ILoginPayload';

class UserController {
  constructor() {}

  public Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const payload: loginPayload = { email, password };

  }
}

export default UserController;