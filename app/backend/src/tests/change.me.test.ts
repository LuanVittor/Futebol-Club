import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import User from '../database/models/User'

import { leaderboardAwayMocked, leaderboardHomeMocked, LeaderboardMocked, TeamsMocked, UsersMOcked } from './mocks'
import Teams from '../database/models/Teams';
import LeaderboardService from '../Services/LeaderboardService';
import ILeaderboard from '../interfaces/Leaderboard';

const leaderboardService =  new LeaderboardService()

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas de login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves(UsersMOcked[0] as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('POST /login', () => {
    it("Retorna mensagem de erro 'All fields must be filled' quando apenas a senha seja informada", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: 'password',
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it("Retorna um erro 'All fields must be filled' quando apenas o email for informado", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'usuario@dominio.com.br'
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('Nao permite email de formato invalido.', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: UsersMOcked[1].email,
        password: 'secret_user', // senha do seeders
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('Nao permite senha com menos de 6 caracteres', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'naoexiste@noDataBase.com',
        password: UsersMOcked[1].password, 
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('Nao permite login quando o email nao esta cadastrado no banco de dados', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'naoexiste@noDataBase.com',
        password: 'senhaValida'
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('Nao permite login quando a senha esta errada', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: UsersMOcked[0].email,
        password: 'senhaInvalida'
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('Login consegue ser realizado com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: UsersMOcked[0].email,
        password: 'secret_user',
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.user).to.be.keys('id', 'username', 'role', 'email');
      expect(chaiHttpResponse.body.token).to.be.string;
    });
  });

  describe('GET /login/validate', () => {
    it('Retorna erro caso nao tenha o token.', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
      .send();

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.error).to.be.equal('Token not found');
    });

    it('Erro caso o token seja inválido.', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set({ authorization: 'Qualquer.Token' });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.error).to.be.equal('Expired or invalid token');
    });
  });
});


describe('Rotas de Teams', () => {
  let chaiHttpResponse: Response;

  describe('find all teams', () => {
    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(TeamsMocked as Teams[]);
    });

    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    });

    it('retorna um array com todos os times', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.be.keys('id', 'teamName');
      expect(chaiHttpResponse.body[1]).to.be.keys('id', 'teamName');
      expect(chaiHttpResponse.body[2]).to.be.keys('id', 'teamName');
    });
  });
})

describe('findOne expecifiqy team:', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Teams, 'findOne').resolves(TeamsMocked[0] as Teams); 
  });

  after(() => {
    (Teams.findOne as sinon.SinonStub).restore();
  });

  it('FIltra um time pelo seu id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.keys('id', 'teamName');
    expect(chaiHttpResponse.body.id).to.be.equal(1);
  });
});


describe('/leaderboards', () => {
  let chaiHttpResponse: Response;

  describe('faz a tabela de classificacao', () => {
    before(async () => {
      sinon.stub(leaderboardService, 'makeLeaderboard').resolves(LeaderboardMocked as ILeaderboard[]);
    });

    after(() => {
      (leaderboardService.makeLeaderboard as sinon.SinonStub).restore();
    });

    it('faz a tabela de classificacao geral', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[1]).to.be.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsFavor', 'goalsBalance', 'efficiency'); 
      
    });
  });

  describe('faz a tabela de classificacao de jogos em casa', () => {
    before(async () => {
      sinon.stub(leaderboardService, 'makeHomeLeaderboard').resolves(leaderboardHomeMocked as ILeaderboard[]);
    });

    after(() => {
      (leaderboardService.makeHomeLeaderboard as sinon.SinonStub).restore();
    });

    it('4.2.1) Retorna a classificação do torneio, apenas considerando pontos obtidos em casa.', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[1]).to.be.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsFavor', 'goalsBalance', 'efficiency');
    });
  });

  describe('faz a tabela de classificacao de jogos fora de casa', () => {
    before(async () => {
      sinon.stub(leaderboardService, 'makeAwayLeaderboard').resolves(leaderboardAwayMocked as ILeaderboard[]);
    });

    after(() => {
      (leaderboardService.makeAwayLeaderboard as sinon.SinonStub).restore();
    });

    it('faz a tabela de classificacao de jogos em casa', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[1]).to.be.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsFavor', 'goalsBalance', 'efficiency');
    });
  });

}); 