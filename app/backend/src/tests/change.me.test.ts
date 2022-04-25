import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import User from '../database/models/User'

import { UsersMOcked } from './mocks'

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
        email: UsersMOcked[0].email,
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
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
});