require('dotenv').config();
const mysql = require('mysql2/promise');

let pool = null;

if (process.env.ENABLE_DB === 'true') {
//  console.log('process.env.NODE_ENV=',process.env.NODE_ENV);
//  console.log('process.env.JAWSDB_URL=', process.env.JAWSDB_URL);
//  console.log('process.env.JAWSDB_TEST_URL=', process.env.JAWSDB_TEST_URL);
  pool = mysql.createPool(
    process.env.NODE_ENV === 'test'
      ? process.env.JAWSDB_TEST_URL
      : process.env.JAWSDB_URL
  );
} else {
  console.warn('[DB] JAWSDB connections disabled by configuration.');
}

module.exports = pool;
