require('dotenv').config();

// Load testTestDesign into the design table with name='test' and type='Test-Design'
// Model this after the design/model used by the client, but without content
const testTestDesign = {
    "type": "Test-Design",
    "version": "0.0"
};
// Same name, but different type
const testTestDesign2 = {
    "type": "Test-Design2",
    "version": "0.2"
};
// Different name, but same type
const test2TestDesign = {
    "type": "Test-Design",
    "version": "2.0"
};

process.env.NODE_ENV = 'test';

const mysql = require('mysql');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// ============================================================================

describe('Misc API endpoints and empty DB', () => {

      beforeEach((done) => { // Before each test we empty the database
          var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
          connection.connect();
          var stmt = 'DELETE FROM user WHERE 1'; // Empty test user table
  //        console.log('TEST: stmt='+stmt);
          connection.query(stmt, function(err, rows, fields) {
  //            console.log('TEST: After DELETE FROM user err=', err, ' rows=', rows);
              if (err) throw err;
              stmt = 'DELETE FROM token WHERE 1'; // Empty test token table
  //            console.log('TEST: stmt='+stmt);
              connection.query(stmt, function(err, rows, fields) {
  //                console.log('TEST: After DELETE FROM token err=', err, ' rows=', rows);
                  if (err) throw err;
                  done();
                  connection.end();
              });
          });
      });

    describe('GET /api/v1/db_size without Authorization', () => {
        it('it should GET with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .get('/api/v1/db_size')
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });

    describe('GET /api/v1/search', () => {
        it('it should GET with 200 OK', (done) => {
            chai.request(server)
                .get('/api/v1/search')
                .query({ terms: 'spring' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done(err);
                });
        });
    });

    describe('GET /api/v1/me without session', () => {
        it('it should GET with 200 OK unauthenticated', (done) => {
            chai.request(server)
                .get('/api/v1/me')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.nested.property('authState.isAuthenticated', false);
                    done(err);
                });
        });
    });

    describe('POST /api/v1/register with short password', () => {
        it('it should fail POST with 400 BAD REQUEST', (done) => {
            chai.request(server)
                .post('/api/v1/register')
                .send({ email: 'test@example.com', password: 'short', first_name: 'F', last_name: 'L' })
                .end((err, res) => {
                    res.should.have.status(400);
                    done(err);
                });
        });
    });

    describe('POST /api/v1/logout', () => {
        it('it should POST with 200 OK', (done) => {
            chai.request(server)
                .post('/api/v1/logout')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
                    res.should.have.status(200);
                    done(err);
                });
        });
    });

    describe('GET /api/v1/confirm with invalid token', () => {
        it('it should fail GET with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .get('/api/v1/confirm')
                .query({ token: 'invalid-token' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });

    describe('GET /api/v1/has-password with unknown email', () => {
        it('it should fail GET with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .get('/api/v1/has-password')
                .query({ email: 'unknown@example.com' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });

    describe('POST /api/v1/login with invalid credentials', () => {
        it('it should fail POST with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .post('/api/v1/login')
                .send({ email: 'nouser@example.com', password: 'Badpass1' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });

    describe('POST /api/v1/reset-password with unknown email', () => {
        it('it should fail POST with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .post('/api/v1/reset-password')
                .send({ email: 'nouser@example.com' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });

    describe('POST /api/v1/resend?type=confirm with unknown email', () => {
        it('it should fail POST with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .post('/api/v1/resend?type=confirm')
                .send({ email: 'nouser@example.com' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });
    describe('POST /api/v1/resend?type=reset with unknown email', () => {
        it('it should fail POST with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .post('/api/v1/resend?type=reset')
                .send({ email: 'nouser@example.com' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });


    describe('PATCH /api/v1/change-password with invalid token', () => {
        it('it should fail PATCH with 401 UNAUTHORIZED', (done) => {
            chai.request(server)
                .patch('/api/v1/change-password')
                .send({ email: 'nouser@example.com', token: 'bad', password: 'Valid123' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done(err);
                });
        });
    });

    // ============================================================================

    describe('Misc API endpoints with non-empty DB', () => {

        beforeEach((done) => { // Before each test we empty the database
            var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
            connection.connect();
            var stmt = 'DELETE FROM user WHERE 1'; // Empty test user table
//            console.log('TEST: stmt='+stmt);
            connection.query(stmt, function(err, rows, fields) {
//                console.log('TEST: After DELETE FROM user err=', err, ' rows=', rows);
                if (err) throw err;
                var stmt = 'INSERT INTO user (email, password, first_name, last_name, role, token, status, created_at, last_login_at) VALUES ';
                stmt += '(\'adminuser@example.com\',\'$2b$12$Mz2M7ny.8nvRVIqbhXe9VORFRC/3GkvM.ttv5CRksJXa5hsZxB5gy\',\'Admin\',\'User\',\'admin\',\'ADMIN0123456789\',\'active\',\'2025-08-16 15:45:00.000000\',null)';
                connection.query(stmt, function(err, rows, fields) {
//                  console.log('TEST: After INSERT INTO user err=', err, ' rows=', rows);
                    if (err) throw err;
                    stmt = 'DELETE FROM token WHERE 1'; // Empty test token table
//                    console.log('TEST: stmt='+stmt);
                    connection.query(stmt, function(err, rows, fields) {
//                        console.log('TEST: After DELETE FROM token err=', err, ' rows=', rows);
                        if (err) throw err;
                        done();
                        connection.end();
                    });
                });
            });
        });

        describe('DELETE /api/v1/cleanup-expired-tokens', () => {
            it('it should DELETE with 200 OK', (done) => {
                chai.request(server)
                    .delete('/api/v1/cleanup-expired-tokens')
                    .set('Authorization', 'Bearer ADMIN0123456789')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done(err);
                    });
            });
        });

    });

});
