require('dotenv').config();

process.env.NODE_ENV = 'test';

const mysql = require('mysql');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// Our parent block
describe('Designs', () => {
    
    beforeEach((done) => { // Before each test we empty the database
        var connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
        connection.connect();
        connection.query('DELETE FROM design WHERE 1', function(err, rows, fields) {
            if (err) throw err;
            done();
        });
        connection.end();
    });
    
    describe('/GET designs', () => {
        it('it should GET no designs', (done) => {
          chai.request(server)
              .get('/api/v1/designs')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
    });
    
});
