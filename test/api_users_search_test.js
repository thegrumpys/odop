require('dotenv').config();

process.env.NODE_ENV = 'test';

const mysql = require('mysql');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let userId;

chai.use(chaiHttp);

describe('Admin User Search', () => {
  before((done) => {
    var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
    connection.connect();
    const stmt = "INSERT INTO user (email, first_name, last_name, role, token, status) VALUES ('search@example.com','First','Last','admin','ADMINTOKEN','active')";
    connection.query(stmt, function(err, results) {
      if (!err) userId = results.insertId;
      connection.end();
      done(err);
    });
  });

  after((done) => {
    var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
    connection.connect();
    connection.query('DELETE FROM user WHERE id = ?', [userId], function(err) {
      connection.end();
      done(err);
    });
  });

  it('should fail without auth', (done) => {
    chai
      .request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });

  it('should get user list by email', (done) => {
    chai
      .request(server)
      .get('/api/v1/users?email=search@example.com')
      .set('Authorization', 'Bearer ADMINTOKEN')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done(err);
      });
  });

  it('should delete user by id', (done) => {
    chai
      .request(server)
      .delete(`/api/v1/users/${userId}`)
      .set('Authorization', 'Bearer ADMINTOKEN')
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });
});
