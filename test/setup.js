exports.mochaHooks = {
  async beforeAll() {
    // chai-http 5 exports request separately; older installs expose a callable chai.request.
    const { default: chaiHttp, request } = await import('chai-http');
    const chai = require('chai');
    chai.use(chaiHttp);
    if (request) {
      chai.request = request;
    } else {
      chai.request.execute = chai.request;
    }
  },
  async afterAll() {
    const app = require('../server');
    if (app && typeof app.closeSessionStore === 'function') {
      await app.closeSessionStore();
    }
    const db = require('../db');
    if (db) {
      await db.end();
    }
  }
};
