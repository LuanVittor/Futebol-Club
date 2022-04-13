import { Pool, RowDataPacket } from 'mysql2/promise';
import loginPayload from '../interfaces/ILoginPayload';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getUser(payload: loginPayload) {
    
  }
}