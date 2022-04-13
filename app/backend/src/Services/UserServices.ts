import User from '../database/models/User';
import loginPayload from '../interfaces/ILoginPayload';
import Jwt from '../middlewares/auth';
const bcrypt = require('bcrypt');

export default class UserService {
  private model = User;
  private jwt = new Jwt()

  private async loginValid(payload: loginPayload) {
    const result = await this.model.findOne({ where: { email: payload.email } });
    if (!result) {
      throw new Error('Incorrect email or password');
    }
    const validPassword = await bcrypt.compare(payload.password, result.password);
    if (!validPassword) {
      throw new Error('Incorrect email or password');
    }
    return result
  }

  public async login(payload: loginPayload) {
    const result = await this.loginValid(payload);
    const { id, username, role, email } = result;
    const token = await this.jwt.generateJwt({ id, username, role, email });
    return {
      user: {
        id, username, role, email,
      },
      token,
    };
  }
}