import * as jwt from 'jsonwebtoken';
import * as rf from 'fs/promises';

export interface Data {
  id: number,
  username: string,
  role: string,
  email: string,
}

export default class Jwt {
  jwt = jwt;

  static senha = async () => rf.readFile('jwt.evaluation.key', 'utf-8');

  async generateJwt(obj: Data) {
    const secret = await Jwt.senha();
    const jwt = this.jwt.sign(obj, secret, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return jwt;
  }
}