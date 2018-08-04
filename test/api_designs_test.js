require('dotenv').config();
const initialState = require('./initialState');

process.env.NODE_ENV = 'test';

const mysql = require('mysql');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// Our parent block
describe('Designs with empty DB', () => {
    
    beforeEach((done) => { // Before each test we empty the database
        var connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
        connection.connect();
        connection.query('DELETE FROM design WHERE 1', function(err, rows, fields) {
//            console.log('After DELETE err=', err, ' rows=', rows);
            if (err) throw err;
            done();
            connection.end();
        });
    });
    
    describe('GET / with empty DB', () => {
        it('it should GET with 200 OK *', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('object');
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designs with empty DB', () => {
        it('it should GET with 200 OK no design names', (done) => {
            chai.request(server)
                .get('/api/v1/designs')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designs/test with empty DB', () => {
        it('it should fail GET with 404 NOT FOUND, because name does not exist', (done) => {
            chai.request(server)
                .get('/api/v1/designs/test')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
    describe('POST /api/v1/designs/test with empty DB', () => {
        it('it should fail POST with 400 BAD REQUEST, because body is empty', (done) => {
            chai.request(server)
                .post('/api/v1/designs/test')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('POST /api/v1/designs/test with empty DB', () => {
        it('it should POST with 200 OK one design by name', (done) => {
            chai.request(server)
                .post('/api/v1/designs/test')
                .send(initialState)
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designs/test with empty DB', () => {
        it('it should fail PUT with 400 BAD REQUEST, because body is empty', (done) => {
            chai.request(server)
                .put('/api/v1/designs/test')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designs/test with empty DB', () => {
        it('it should fail PUT with 404 NOT FOUND, because name does not exist', (done) => {
            chai.request(server)
                .put('/api/v1/designs/test')
                .send(initialState)
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designs/test with empty DB', () => {
        it('it should fail DELETE with 404 NOT FOUND, because name does not exist', (done) => {
            chai.request(server)
                .delete('/api/v1/designs/test')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
});

describe('Designs with non-empty DB', () => {

    beforeEach((done) => { // Before each test we create a test design
        var connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
        connection.connect();
        connection.query('DELETE FROM design WHERE 1', function(err, rows, fields) {
//            console.log('After DELETE err=', err, ' rows=', rows);
            if (err) throw err;
            var name = 'test';
            var value = JSON.stringify(initialState);
//            console.log('In beforeEach value=', value);
            connection.query('INSERT INTO design (name, value) VALUES (\''+name+'\',\''+value+'\')', function(err, rows, fields) {
//                console.log('After INSERT err=', err, ' rows=', rows);
                if (err) throw err;
                done();
                connection.end();
            });
        });
    });
    
    describe('GET /api/v1/designs with non-empty DB', () => {
        it('it should GET with 200 OK one design name', (done) => {
            chai.request(server)
                .get('/api/v1/designs')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designs/test with non-empty DB', () => {
        it('it should GET with 200 OK one design by name', (done) => {
            chai.request(server)
                .get('/api/v1/designs/test')
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('test');
                    res.body.should.have.property('type').eql('Test-Design');
                    res.body.should.have.property('version').eql('0.0');
                    done(err);
                });
        });
    });
    
    describe('POST /api/v1/designs/test with non-empty DB', () => {
        it('it should fail POST with 400 BAD REQUEST, because name already exists', (done) => {
            chai.request(server)
                .post('/api/v1/designs/test')
                .send(initialState)
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designs/test with non-empty DB', () => {
        it('it should PUT with 200 OK one design by name', (done) => {
            chai.request(server)
                .put('/api/v1/designs/test')
                .send(initialState)
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designs/test with non-empty DB', () => {
        it('it should DELETE with 200 OK one design by name', (done) => {
            var name = 'test';
            chai.request(server)
                .delete('/api/v1/designs/'+name)
                .end((err, res) => {
//                    console.log('err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
});
