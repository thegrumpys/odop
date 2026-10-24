require('dotenv').config();
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { randomUUID } = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../db');
const app = require('../server');
const { hashPassword } = require('../auth');
const referenceDesign = require('./fixtures/SimpleSearchStartup.json');

chai.use(chaiHttp);

// Tests real HTTP, MySQL, password hashing and sessions; only SMTP is intercepted.
// The server suite uses its own fixture and never runs or loads client tests.
describe('Release user workflows', function () {
  this.timeout(30000);
  const prefix = 'release-' + randomUUID();
  const ownerEmail = prefix + '@example.com';
  const otherEmail = prefix + '-other@example.com';
  const registrationEmail = prefix + '-register@example.com';
  const ownerToken = prefix + '-owner';
  const otherToken = prefix + '-other';
  const password = 'ReleaseTest123';
  const name = prefix + " designer's spring";
  const designUrl = '/api/v1/designtypes/Spring%2FCompression/designs/' + encodeURIComponent(name);
  const mailer = Object.getPrototypeOf(nodemailer.createTransport({ jsonTransport: true }));
  const sendMail = mailer.sendMail;
  const mailbox = [];
  let ownerId;

  const http = () => chai.request(app);
  const auth = (request, token = ownerToken) => request.set('Authorization', 'Bearer ' + token);
  const model = () => JSON.parse(JSON.stringify(referenceDesign));

  before(async () => {
    expect(db, 'ENABLE_DB=true and JAWSDB_TEST_URL are required').not.to.equal(null);
    mailer.sendMail = async (message) => {
      mailbox.push(message);
      return { accepted: [message.to] };
    };
    const hashed = await hashPassword(password);
    const [result] = await db.execute(
      'INSERT INTO user (email, password, first_name, last_name, role, token, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [ownerEmail, hashed, 'Release', 'Tester', 'user', ownerToken, 'active']
    );
    ownerId = result.insertId;
    await db.execute(
      'INSERT INTO user (email, password, first_name, last_name, role, token, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [otherEmail, hashed, 'Other', 'Tester', 'user', otherToken, 'active']
    );
  });

  after(async () => {
    mailer.sendMail = sendMail;
    if (!db) return;
    await db.execute('DELETE FROM design WHERE user IN (?, ?)', [ownerToken, otherToken]);
    await db.execute('DELETE FROM token WHERE email IN (?, ?, ?)', [ownerEmail, otherEmail, registrationEmail]);
    await db.execute('DELETE FROM user WHERE email IN (?, ?, ?)', [ownerEmail, otherEmail, registrationEmail]);
  });

  it('registers, confirms once, signs in, retains a session and signs out', async () => {
    const agent = chai.request.agent(app);
    try {
      let res = await agent.post('/api/v1/register').send({
        email: registrationEmail, password, first_name: 'New', last_name: 'Tester'
      });
      expect(res).to.have.status(200);
      expect(mailbox.some((message) => message.to === registrationEmail && message.subject === 'Confirm your account')).to.equal(true);
      res = await agent.post('/api/v1/login').send({ email: registrationEmail, password });
      expect(res).to.have.status(401);
      const [tokens] = await db.execute('SELECT token FROM token WHERE email = ? AND type = ?', [registrationEmail, 'confirm']);
      expect(tokens).to.have.length(1);
      const token = tokens[0].token;
      expect(mailbox.find((message) => message.to === registrationEmail).html).to.include(token);
      res = await agent.get('/api/v1/confirm').query({ token });
      expect(res).to.have.status(200);
      res = await agent.get('/api/v1/confirm').query({ token });
      expect(res).to.have.status(401);
      res = await agent.post('/api/v1/login').send({ email: registrationEmail, password });
      expect(res).to.have.status(200);
      expect(res.headers['set-cookie'].join(';')).to.include('HttpOnly');
      for (let i = 0; i < 2; i++) {
        res = await agent.get('/api/v1/me');
        expect(res).to.have.status(200);
        expect(res.body.authState).to.include({ email: registrationEmail, isAuthenticated: true, isAdmin: false });
      }
      res = await agent.post('/api/v1/logout');
      expect(res).to.have.status(200);
      res = await agent.get('/api/v1/me');
      expect(res.body.authState.isAuthenticated).to.equal(false);
    } finally {
      agent.close();
    }
  });

  it('resets the password, consumes the token and rejects the old password', async () => {
    let res = await http().post('/api/v1/reset-password').send({ email: ownerEmail });
    expect(res).to.have.status(200);
    const [tokens] = await db.execute('SELECT token FROM token WHERE email = ? AND type = ?', [ownerEmail, 'reset']);
    expect(tokens).to.have.length(1);
    const token = tokens[0].token;
    expect(mailbox.find((message) => message.to === ownerEmail && message.subject === 'Reset your password').html).to.include(token);
    res = await http().get('/api/v1/has-reset-token').query({ token });
    expect(res).to.have.status(200);
    res = await http().patch('/api/v1/change-password').send({ email: otherEmail, token, password: 'Replacement123' });
    expect(res).to.have.status(401);
    res = await http().patch('/api/v1/change-password').send({ email: ownerEmail, token, password: 'Replacement123' });
    expect(res).to.have.status(200);
    res = await http().patch('/api/v1/change-password').send({ email: ownerEmail, token, password: 'AnotherPassword123' });
    expect(res).to.have.status(401);
    res = await http().post('/api/v1/login').send({ email: ownerEmail, password });
    expect(res).to.have.status(401);
    const agent = chai.request.agent(app);
    try {
      res = await agent.post('/api/v1/login').send({ email: ownerEmail, password: 'Replacement123' });
      expect(res).to.have.status(200);
      res = await agent.get('/api/v1/me');
      expect(res.body.authState.email).to.equal(ownerEmail);
      await agent.post('/api/v1/logout');
    } finally {
      agent.close();
    }
  });

  for (const type of ['confirm', 'reset']) {
    it('rejects an expired ' + type + ' token', async () => {
      const token = prefix + '-expired-' + type;
      await db.execute('INSERT INTO token (token, email, type, expires_at) VALUES (?, ?, ?, DATE_SUB(NOW(), INTERVAL 1 DAY))',
        [token, otherEmail, type]);
      const res = type === 'confirm'
        ? await http().get('/api/v1/confirm').query({ token })
        : await http().patch('/api/v1/change-password').send({ token, email: otherEmail, password: 'Replacement123' });
      expect(res).to.have.status(401);
    });
  }

  it('saves, lists, reopens, updates and deletes a complete design without losing fields', async () => {
    const original = model();
    original.labels = [{ name: 'COMMENT', value: "Designer's spring\nSecond line with metric µ and quotes \"test\"" }];
    let res = await auth(http().post(designUrl)).send(original);
    expect(res).to.have.status(200);
    res = await auth(http().get('/api/v1/designtypes/Spring%2FCompression/designs'));
    expect(res).to.have.status(200);
    expect(res.body).to.deep.include({ user: ownerToken, name });
    res = await auth(http().get(designUrl));
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(original);
    const updated = model();
    updated.symbol_table.find((entry) => entry.name === 'Wire_Dia').value = 0.125;
    res = await auth(http().put(designUrl)).send(updated);
    expect(res).to.have.status(200);
    res = await auth(http().get(designUrl));
    expect(res.body).to.deep.equal(updated);
    res = await auth(http().delete(designUrl));
    expect(res).to.have.status(200);
    res = await auth(http().get(designUrl));
    expect(res).to.have.status(404);
  });

  it('hides private designs from other users and prevents their update or deletion', async () => {
    let res = await auth(http().post(designUrl)).send(model());
    expect(res).to.have.status(200);
    res = await auth(http().get('/api/v1/designtypes/Spring%2FCompression/designs'), otherToken);
    expect(res.body.some((entry) => entry.name === name)).to.equal(false);
    for (const method of ['get', 'put', 'delete']) {
      let req = auth(http()[method](designUrl), otherToken);
      if (method === 'put') req = req.send(model());
      res = await req;
      expect(res).to.have.status(404);
    }
    res = await auth(http().get(designUrl));
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(model());
  });

  it('rejects missing/invalid credentials, guest writes and mismatched design types', async () => {
    let res = await http().post(designUrl).send(model());
    expect(res).to.have.status(401);
    res = await auth(http().get(designUrl), prefix + '-invalid');
    expect(res).to.have.status(401);
    res = await auth(http().post(designUrl), 'null').send(model());
    expect(res).to.have.status(400);
    res = await auth(http().put(designUrl)).send({ ...model(), type: 'Solid' });
    expect(res).to.have.status(400);
  });

  it('denies regular users access to admin endpoints and impersonation', async () => {
    let res = await auth(http().get('/api/v1/users'));
    expect(res).to.have.status(401);
    res = await auth(http().post('/api/v1/users/' + ownerId + '/login-as'));
    expect(res).to.have.status(401);
  });
});
