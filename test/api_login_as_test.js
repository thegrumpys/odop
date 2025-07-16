require('dotenv').config();

process.env.NODE_ENV = 'test';

const mysql = require('mysql');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let adminId;
let userId;

chai.use(chaiHttp);

describe('Admin login-as endpoint', () => {
  before((done) => {
    const connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
    connection.connect();
    const stmtAdmin = "INSERT INTO user (email, role, token, status) VALUES ('admintest@example.com','admin','ADMTEST','active')";
    connection.query(stmtAdmin, function (err, res1) {
      if (err) { connection.end(); return done(err); }
      adminId = res1.insertId;
      const stmtUser = "INSERT INTO user (email, role, token, status) VALUES ('loginas@example.com','user','LOGTOKEN','active')";
      connection.query(stmtUser, function (err2, res2) {
        if (err2) { connection.end(); return done(err2); }
        userId = res2.insertId;
        connection.end();
        done();
      });
    });
  });

  after((done) => {
    const connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
    connection.connect();
    connection.query('DELETE FROM user WHERE id IN (?,?)', [userId, adminId], function (err) {
      connection.end();
      done(err);
    });
  });

  it('should login as user', (done) => {
    chai
      .request(server)
      .post(`/api/v1/users/${userId}/login-as`)
      .set('Authorization', 'Bearer ADMTEST')
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });
});
