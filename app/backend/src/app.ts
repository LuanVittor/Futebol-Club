import bodyParser = require('body-parser');
import * as express from 'express';
import UserController from './Controllers/UserController';
import validLogin from './middlewares/validateLogin';

const userController = new UserController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.post('/login', validLogin, userController.Login);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl, bodyParser.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`app rodando ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
