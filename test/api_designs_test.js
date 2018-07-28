require('dotenv').config();

process.env.NODE_ENV = 'test';

const mysql = require('mysql');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

function loadDesign(name) {
    var value = require('./initialState');
    var connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
    connection.connect();
    connection.query('INSERT INTO design (name, value) VALUES (\''+name+'\',\''+value+'\')', function(err, rows, fields) {
      console.log('err=', err, ' rows=', rows);
      if (err) throw err;
      res.end();
    });
    connection.end();
}

// Our parent block
describe('Designs', () => {
    
    beforeEach((done) => { // Before each test we empty the database
        var connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
        connection.connect();
        connection.query('DELETE FROM design WHERE 1', function(err, rows, fields) {
//            console.log('err=', err, ' rows=', rows);
            if (err) throw err;
            done();
        });
        connection.end();
    });
    
    describe('GET /api/v1/designs', () => {
        it('it should GET no designs', (done) => {
            chai.request(server)
                .get('/api/v1/designs')
                .end((err, res) => {
                    console.log('err=', err, ' res=', res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designs/test', () => {
        it('it should fail GET file not found, because name missing ', (done) => {
            chai.request(server)
                .get('/api/v1/designs/test')
                .end((err, res) => {
                    console.log('err=', err, ' res=', res);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designs/:name', () => {
        it('it should fail DELETE with file not found, because name missing', (done) => {
            chai.request(server)
                .delete('/api/v1/designs/test')
                .end((err, res) => {
                    console.log('err=', err, ' res=', res);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designs/:name', () => {
        it('it should DELETE file', (done) => {
            var name = 'test';
            loadDesign(name);
            chai.request(server)
                .delete('/api/v1/designs/'+name)
                .end((err, res) => {
                    console.log('err=', err, ' res=', res);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
});
