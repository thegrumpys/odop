exports.mochaHooks = {
  async beforeAll() {
    // chai-http 5 is an ES module; load its default plugin before running tests.
    const { default: chaiHttp } = await import('chai-http');
    require('chai').use(chaiHttp);
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
