import bodyParser = require('body-parser');
import * as express from 'express';
import MatchesController from './Controllers/MatchesController';
import TeamController from './Controllers/TeamsController';
import UserController from './Controllers/UserController';
import validLogin from './middlewares/validateLogin';
import hasToken from './middlewares/validateToken';

const userController = new UserController();
const teamController = new TeamController();
const matchesController = new MatchesController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.post('/login', validLogin, userController.Login);
    this.app.get('/login/validate', hasToken, userController.getRole);
    this.app.get('/teams', teamController.getAllTeams);
    this.app.get('/teams/:id', teamController.getTeamById);
    this.app.get('/matches', matchesController.AllMatches);
    this.app.post('/matches', hasToken, matchesController.createMatch);
    this.app.patch('/matches/:id', matchesController.editScore);
    this.app.patch('/matches/:id/finish', matchesController.endMatch);
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
    this.app.listen(PORT, () => console.log(`App esta rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
