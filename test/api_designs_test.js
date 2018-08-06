require('dotenv').config();

// Load testDesign into the design table with name='test' and type='Test-Design'
// Model this after the deisgn/model used by the client, but without content
const testDesign = {
        "name": "test",
        "type": "Test-Design",
        "version": "0.0"
    };

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
        var stmt = 'DELETE FROM design WHERE 1';
//        console.log('TEST: stmt='+stmt);
        connection.query(stmt, function(err, rows, fields) {
//            console.log('TEST: After DELETE err=', err, ' rows=', rows);
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
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('object');
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designtypes with empty DB', () => {
        it('it should GET with 200 OK no design types', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designs with empty DB', () => {
        it('it should GET with 200 OK no design names', (done) => {
            chai.request(server)
                .get('/api/v1/designs')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
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
//                    console.log('TEST: err=', err);
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
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('POST /api/v1/designs/test with empty DB', () => {
        it('it should POST with 200 OK one design by name', (done) => {
            chai.request(server)
                .post('/api/v1/designs/test')
                .send(testDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
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
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designs/test with empty DB', () => {
        it('it should fail PUT with 404 NOT FOUND, because name does not exist', (done) => {
            chai.request(server)
                .put('/api/v1/designs/test')
                .send(testDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
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
//                    console.log('TEST: err=', err);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designs/startup with non-empty DB', () => {
        it('it should fail DELETE with 400 BAD REQUEST, because name is startup', (done) => {
            var name = 'startup';
            chai.request(server)
                .delete('/api/v1/designs/'+name)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
});

describe('Designs with non-empty DB', () => {

    beforeEach((done) => { // Before each test we create a test design
        var connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
        connection.connect();
        var stmt = 'DELETE FROM design WHERE 1';
//        console.log('TEST: stmt='+stmt);
        connection.query(stmt, function(err, rows, fields) {
//            console.log('TEST: After DELETE err=', err, ' rows=', rows);
            if (err) throw err;
            var copy = Object.assign({},testDesign); // Make a copy
            var name = copy.name; // Get the name from the blob
            var type = copy.type; // Get the type from the blob
            delete copy.name; // Delete the name from the blob
            delete copy.type; // Delete the type from the blob
            var value = JSON.stringify(copy); // Convert blob to string
//            console.log('TEST: Before INSERT name=', name,' type=', type,' value=', value);
            var stmt = 'INSERT INTO design (name, type, value) VALUES (\''+name+'\',\''+type+'\',\''+value+'\')';
//            console.log('TEST: stmt='+stmt);
            connection.query(stmt, function(err, rows, fields) {
//                console.log('TEST: After INSERT err=', err, ' rows=', rows);
                if (err) throw err;
                done();
                connection.end();
            });
        });
    });
    
    describe('GET /api/v1/designtypes with non-empty DB', () => {
        it('it should GET with 200 OK one design type', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].should.be.eql('Test-Design');
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designs with non-empty DB', () => {
        it('it should GET with 200 OK one design name', (done) => {
            chai.request(server)
                .get('/api/v1/designs')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].should.be.eql('test');
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designs/test with non-empty DB', () => {
        it('it should GET with 200 OK one design by name', (done) => {
            chai.request(server)
                .get('/api/v1/designs/test')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
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
                .send(testDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designs/test with non-empty DB', () => {
        it('it should PUT with 200 OK one design by name', (done) => {
            chai.request(server)
                .put('/api/v1/designs/test')
                .send(testDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
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
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designs/startup with non-empty DB', () => {
        it('it should fail DELETE with 400 BAD REQUEST, because name is startup', (done) => {
            var name = 'startup';
            chai.request(server)
                .delete('/api/v1/designs/'+name)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
});
