exports.mochaHooks = {
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
