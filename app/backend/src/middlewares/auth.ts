import * as jwt from 'jsonwebtoken';
import * as rf from 'fs/promises';

export interface Data {
  id: number,
  username: string,
  role: string,
  email: string,
}

export default class Jwt {
  static JWT_SECRET = async () => rf.readFile('jwt.evaluation.key', 'utf-8');

  static async generateJwt(obj: Data) {
    const secret = await Jwt.JWT_SECRET();
    const token = jwt.sign(obj, secret, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return token;
  }
}
