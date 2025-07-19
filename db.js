require('dotenv').config();
const mysql = require('mysql2/promise');
//
//console.log('process.env.NODE_ENV=',process.env.NODE_ENV);
//console.log('process.env.JAWSDB_URL=', process.env.JAWSDB_URL);
//console.log('process.env.JAWSDB_TEST_URL=', process.env.JAWSDB_TEST_URL);
const pool = mysql.createPool(
  process.env.NODE_ENV === 'test'
    ? process.env.JAWSDB_TEST_URL
    : process.env.JAWSDB_URL
);

module.exports = pool;
