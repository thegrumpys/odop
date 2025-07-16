require('dotenv').config();
const mysql = require('mysql2/promise');
//
//console.log('process.env.NODE_ENV=',process.env.NODE_ENV);
//console.log('process.env.JAWSDB_TEST_URL=',process.env.JAWSDB_TEST_URL);
//console.log('host=',process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_HOST : process.env.MYSQL_HOST);
//console.log('port=',process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_PORT : process.env.MYSQL_PORT);
//console.log('user=',process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_USER : process.env.MYSQL_USER);
//console.log('password=',process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_PASSWORD : process.env.MYSQL_PASSWORD);
//console.log('databse=',process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_DATABASE : process.env.MYSQL_DATABASE);
const pool = mysql.createPool({
  host: process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_HOST : process.env.MYSQL_HOST,
  port: process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_PORT : process.env.MYSQL_PORT,
  user: process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_USER : process.env.MYSQL_USER,
  password: process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_PASSWORD : process.env.MYSQL_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_DATABASE : process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

module.exports = pool;
