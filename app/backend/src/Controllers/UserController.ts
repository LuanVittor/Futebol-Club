import { Request, Response } from 'express';
import UserService from '../Services/UserServices';
import loginPayload from '../interfaces/ILoginPayload';

class UserController {
  constructor(private userService = new UserService()) {}

  public Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const payload: loginPayload = { email, password };
    const result = await this.userService.login(payload);
    if (result.error) {
      return res.status(result.code).json(result.error);
    }
    return res.status(200).json(result);
  };

  public getRole = (req: Request, res: Response) => {
    const { role } = req.body.result;
    return res.status(200).json(role);
  };
}

export default UserController;
