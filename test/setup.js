exports.mochaHooks = {
  async afterAll() {
    const db = require('../db');
    if (db) {
      await db.end();
    }
  }
};
