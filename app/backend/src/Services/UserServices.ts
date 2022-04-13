import * as bcryptjs from 'bcryptjs';
import User from '../database/models/User';
import loginPayload from '../interfaces/ILoginPayload';
import Jwt from '../middlewares/auth';

export default class UserService {
  private model = User;

  public async login(payload: loginPayload) {
    const result = await this.model.findOne({ where: { email: payload.email } });
    if (!result) {
      return { error: 'Incorrect email or password', code: 401 };
    }
    const validPassword = await bcryptjs.compare(payload.password, result.password);
    if (!validPassword) {
      return { error: 'Incorrect email or password', code: 401 };
    }
    const { id, username, role, email } = result;
    const token = await Jwt.generateJwt({ id, username, role, email });
    return {
      user: {
        id, username, role, email,
      },
      token,
    };
  }
}
