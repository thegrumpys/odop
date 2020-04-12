require('dotenv').config();

// Load testTestDesign into the design table with name='test' and type='Test-Design'
// Model this after the design/model used by the client, but without content
const testTestDesign = {
    "user": "USERID0123456789",
    "name": "test",
    "type": "Test-Design",
    "version": "0.0"
};
// Same name, but different type
const testTestDesign2 = {
    "user": "USERID0123456789",
    "name": "test",
    "type": "Test-Design2",
    "version": "0.2"
};
// Different name, but same type
const test2TestDesign = {
    "user": "USERID0123456789",
    "name": "test2",
    "type": "Test-Design",
    "version": "2.0"
};

process.env.NODE_ENV = 'test';

const mysql = require('mysql');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//========================================================================================

describe('Designs with empty DB', () => {
    
    beforeEach((done) => { // Before each test we empty the database
        var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
        connection.connect();
        var stmt = 'DELETE FROM design WHERE 1'; // Empty test design table
//        console.log('TEST: stmt='+stmt);
        connection.query(stmt, function(err, rows, fields) {
//            console.log('TEST: After DELETE FROM design err=', err, ' rows=', rows);
            if (err) throw err;
            stmt = 'DELETE FROM usage_log WHERE 1'; // Empty test usage_log table
//            console.log('TEST: stmt='+stmt);
            connection.query(stmt, function(err, rows, fields) {
//                console.log('TEST: After DELETE FROM usage_log err=', err, ' rows=', rows);
                if (err) throw err;
                done();
                connection.end();
            });
        });
    });

// NOT SUPPORTED IN "test" NODE_ENV
//    describe('GET / with empty DB', () => {
//        it('it should GET with 200 OK *', (done) => {
//            chai.request(server)
//                .get('/')
//                .set('Authorization', 'Bearer USERID0123456789')
//                .end((err, res) => {
////                    console.log('TEST: err=', err);
//                    res.should.have.status(200);
//                    should.exist(res.body);
//                    res.body.should.be.a('object');
//                    done(err);
//                });
//        });
//    });
    
    describe('GET /api/v1/designtypes with empty DB', () => {
        it('it should GET with 200 OK no design types', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designtypes/Test-Design/designs with empty DB', () => {
        it('it should GET with 200 OK no design names', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes/Test-Design/designs')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designtypes/Test-Design/designs/test with empty DB', () => {
        it('it should fail GET with 404 NOT FOUND, because test does not exist', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
    describe('POST /api/v1/designtypes/Test-Design/designs/test with empty DB', () => {
        it('it should fail POST with 400 BAD REQUEST, because body is empty', (done) => {
            chai.request(server)
                .post('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('POST /api/v1/designtypes/Test-Design/designs/test with empty DB', () => {
        it('it should POST with 200 OK one design named test typed Test-Design, because test does not exist and GET with 200 OK one design named test typed Test-Design', (done) => {
            chai.request(server)
                .post('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .send(testTestDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    chai.request(server)
                        .get('/api/v1/designtypes/Test-Design/designs/test')
                        .set('Authorization', 'Bearer USERID0123456789')
                        .end((err2, res2) => {
    //                        console.log('TEST: err2=', err2);
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.have.property('user').eql('USERID0123456789');
                            res2.body.should.have.property('name').eql('test');
                            res2.body.should.have.property('type').eql('Test-Design');
                            res2.body.should.have.property('version').eql('0.0');
                            done(err2);
                        });
                });
        });
    });
    
    describe('PUT /api/v1/designtypes/Test-Design/designs/test with empty DB', () => {
        it('it should fail PUT with 400 BAD REQUEST, because body is empty', (done) => {
            chai.request(server)
                .put('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designtypes/Test-Design/designs/test with empty DB', () => {
        it('it should fail PUT with 404 NOT FOUND, because test does not exist', (done) => {
            chai.request(server)
                .put('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .send(testTestDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designtypes/Test-Design/designs/test with empty DB', () => {
        it('it should fail DELETE with 404 NOT FOUND, because test does not exist', (done) => {
            chai.request(server)
                .delete('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(404);
                    done(err);
                });
        });
    });
    
// NO LONGER NEEDED BECAUSE STARTUP FILE'S USER IS NULL MAKING IT READ_ONLY
//    describe('DELETE /api/v1/designtypes/Test-Design/designs/Startup with non-empty DB', () => {
//        it('it should fail DELETE with 400 BAD REQUEST, because name is Startup', (done) => {
//            var name = 'Startup';
//            chai.request(server)
//                .delete('/api/v1/designtypes/Test-Design/designs/'+name)
//                .set('Authorization', 'Bearer USERID0123456789')
//                .end((err, res) => {
////                    console.log('TEST: err=', err);
//                    res.should.have.status(400);
//                    done(err);
//                });
//        });
//    });
    
    describe('POST /api/v1/usage_log/ip_address/66.68.47.92 with empty DB', () => {
        it('it should POST with 200 OK with note=test', (done) => {
            chai.request(server)
                .post('/api/v1/usage_log')
                .send({ note: 'test'})
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
});

//========================================================================================

describe('Designs with non-empty DB', () => {

    beforeEach((done) => { // Before each test we create a test design
        var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
        connection.connect();
        var stmt = 'DELETE FROM design WHERE 1'; // Empty test DB
//        console.log('TEST: stmt='+stmt);
        connection.query(stmt, function(err, rows, fields) {
//            console.log('TEST: After DELETE FROM design err=', err, ' rows=', rows);
            if (err) throw err;
            var copy = Object.assign({},testTestDesign); // Make a copy
            var user = copy.user; // Get the user from the blob
            var name = copy.name; // Get the name from the blob
            var type = copy.type; // Get the type from the blob
            delete copy.user; // Delete the user from the blob
            delete copy.name; // Delete the name from the blob
            delete copy.type; // Delete the type from the blob
            var value = JSON.stringify(copy); // Convert blob to string
//            console.log('TEST: Before INSERT user=', user, ' name=', name,' type=', type,' value=', value);
            var stmt = 'INSERT INTO design (user, name, type, value) VALUES (\''+user+'\',\''+name+'\',\''+type+'\',\''+value+'\')';
//            console.log('TEST: stmt='+stmt);
            connection.query(stmt, function(err, rows, fields) {
//                console.log('TEST: After INSERT INTO design err=', err, ' rows=', rows);
                if (err) throw err;
                var ip_address = '::ffff:127.0.0.1';
                var note = JSON.stringify({ note: 'fill'});
                var stmt = 'INSERT INTO usage_log (ip_address, note) VALUES (\''+ip_address+'\',\''+note+'\')';
//                console.log('TEST: stmt='+stmt);
                connection.query(stmt, function(err, rows, fields) {
//                    console.log('TEST: After INSERT INTO usage_log err=', err, ' rows=', rows);
                    if (err) throw err;
                    done();
                    connection.end();
                });
            });
        });
    });
    
    describe('GET /api/v1/designtypes with non-empty DB', () => {
        it('it should GET with 200 OK one design type', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes')
                .set('Authorization', 'Bearer USERID0123456789')
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
    
    describe('GET /api/v1/designtypes/Test-Design/designs with non-empty DB', () => {
        it('it should GET with 200 OK one design name', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes/Test-Design/designs')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].should.be.eql({user: 'USERID0123456789', name: 'test'});
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designtypes/Test-Design/designs/test with non-empty DB', () => {
        it('it should GET with 200 OK one design named test', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user').eql('USERID0123456789');
                    res.body.should.have.property('name').eql('test');
                    res.body.should.have.property('type').eql('Test-Design');
                    res.body.should.have.property('version').eql('0.0');
                    done(err);
                });
        });
    });
    
    describe('POST /api/v1/designtypes/Test-Design/designs/test with non-empty DB', () => {
        it('it should fail POST with 400 BAD REQUEST, because test already exists', (done) => {
            chai.request(server)
                .post('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .send(testTestDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designtypes/Test-Design/designs/test with non-empty DB', () => {
        it('it should PUT with 200 OK one design named test typed Test-Design, because name already exists, and GET with 200 OK one design named test typed Test-Design', (done) => {
            chai.request(server)
                .put('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .send(testTestDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    chai.request(server)
                        .get('/api/v1/designtypes/Test-Design/designs/test')
                        .set('Authorization', 'Bearer USERID0123456789')
                        .end((err2, res2) => {
    //                        console.log('TEST: err2=', err2);
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.have.property('user').eql('USERID0123456789');
                            res2.body.should.have.property('name').eql('test');
                            res2.body.should.have.property('type').eql('Test-Design');
                            res2.body.should.have.property('version').eql('0.0');
                            done(err2);
                        });
                });
        });
    });
    
    describe('DELETE /api/v1/designtypes/Test-Design/designs/test with non-empty DB', () => {
        it('it should DELETE with 200 OK one design named test', (done) => {
            var name = 'test';
            chai.request(server)
                .delete('/api/v1/designtypes/Test-Design/designs/'+name)
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });

// NO LONGER NEEDED BECAUSE STARTUP FILE'S USER IS NULL MAKING IT READ_ONLY
//    describe('DELETE /api/v1/designtypes/Test-Design/designs/Startup with non-empty DB', () => {
//        it('it should fail DELETE with 400 BAD REQUEST, because name is Startup', (done) => {
//            var name = 'Startup';
//            chai.request(server)
//                .delete('/api/v1/designtypes/Test-Design/designs/'+name)
//                .set('Authorization', 'Bearer USERID0123456789')
//                .end((err, res) => {
////                    console.log('TEST: err=', err);
//                    res.should.have.status(400);
//                    done(err);
//                });
//        });
//    });
    
    describe('POST /api/v1/usage_log with non-empty DB', () => {
        it('it should POST with 200 OK with note=test', (done) => {
            chai.request(server)
                .post('/api/v1/usage_log')
                .send({ note: 'test'})
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
});

// ========================================================================================

describe('Designs with multiple DB entries', () => {

    beforeEach((done) => { // Before each test we create a test design
        var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
        connection.connect();
        var stmt0 = 'DELETE FROM design WHERE 1'; // Empty test DB
//        console.log('TEST: stmt0='+stmt0);
        connection.query(stmt0, function(err0, rows0, fields0) {
//            console.log('TEST: After DELETE err0=', err0, ' rows0=', rows0);
            if (err0) throw err0;
            var copy1 = Object.assign({},testTestDesign); // Make a copy
            var user1 = copy1.user; // Get the user from the blob
            var name1 = copy1.name; // Get the name from the blob
            var type1 = copy1.type; // Get the type from the blob
            delete copy1.user; // Delete the user from the blob
            delete copy1.name; // Delete the name from the blob
            delete copy1.type; // Delete the type from the blob
            var value1 = JSON.stringify(copy1); // Convert blob to string
//            console.log('TEST: Before INSERT user1=', user1,' name1=', name1,' type1=', type1,' value1=', value1);
            var stmt1 = 'INSERT INTO design (user, name, type, value) VALUES (\''+user1+'\',\''+name1+'\',\''+type1+'\',\''+value1+'\')';
//            console.log('TEST: stmt1='+stmt1);
            connection.query(stmt1, function(err1, rows1, fields1) {
//                console.log('TEST: After INSERT err1=', err1, ' rows1=', rows1);
                if (err1) throw err1;
                var copy2 = Object.assign({},testTestDesign2); // Make a copy
                var user2 = copy2.user; // Get the user from the blob
                var name2 = copy2.name; // Get the name from the blob
                var type2 = copy2.type; // Get the type from the blob
                delete copy2.user; // Delete the user from the blob
                delete copy2.name; // Delete the name from the blob
                delete copy2.type; // Delete the type from the blob
                var value2 = JSON.stringify(copy2); // Convert blob to string
//                console.log('TEST: Before INSERT user2=', user2,' name2=', name2,' type2=', type2,' value2=', value2);
                var stmt2 = 'INSERT INTO design (user, name, type, value) VALUES (\''+user2+'\',\''+name2+'\',\''+type2+'\',\''+value2+'\')';
//                console.log('TEST: stmt2='+stmt2);
                connection.query(stmt2, function(err2, rows2, fields2) {
//                    console.log('TEST: After INSERT err2=', err2, ' rows2=', rows2);
                    if (err2) throw err2;
                    var copy3 = Object.assign({},test2TestDesign); // Make a copy
                    var user3 = copy3.user; // Get the user from the blob
                    var name3 = copy3.name; // Get the name from the blob
                    var type3 = copy3.type; // Get the type from the blob
                    delete copy3.user; // Delete the user from the blob
                    delete copy3.name; // Delete the name from the blob
                    delete copy3.type; // Delete the type from the blob
                    var value3 = JSON.stringify(copy3); // Convert blob to string
//                    console.log('TEST: Before INSERT user3=', user3,' type3=', name3=', name3,' type3=', type3,' value3=', value3);
                    var stmt3 = 'INSERT INTO design (user, name, type, value) VALUES (\''+user3+'\',\''+name3+'\',\''+type3+'\',\''+value3+'\')';
//                    console.log('TEST: stmt3='+stmt3);
                    connection.query(stmt3, function(err3, rows3, fields3) {
//                        console.log('TEST: After INSERT err3=', err3, ' rows3=', rows3);
                        if (err3) throw err3;
                        var ip_address4 = '::ffff:127.0.0.1';
                        var note4 = JSON.stringify({ note: 'fill'});
                        var stmt4 = 'INSERT INTO usage_log (ip_address, note) VALUES (\''+ip_address4+'\',\''+note4+'\')';
//                        console.log('TEST: stmt4='+stmt4);
                        connection.query(stmt4, function(err4, rows4, fields4) {
//                            console.log('TEST: After INSERT err4=', err4, ' rows4=', rows4);
                            if (err4) throw err4;
                            var ip_address5 = '::ffff:127.0.0.1';
                            var note5 = JSON.stringify({ note: 'fill'});
                            var stmt5 = 'INSERT INTO usage_log (ip_address, note) VALUES (\''+ip_address5+'\',\''+note5+'\')';
//                            console.log('TEST: stmt5='+stmt5);
                            connection.query(stmt5, function(err5, rows5, fields5) {
//                                console.log('TEST: After INSERT err5=', err5, ' rows5=', rows5);
                                if (err5) throw err5;
                                done();
                                connection.end();
                            });
                        });
                    });
                });
            });
        });
    });
    
    describe('GET /api/v1/designtypes with multiple DB entries', () => {
        it('it should GET with 200 OK two design types named Test-Design and Test-Design2', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    res.body[0].should.be.eql('Test-Design');
                    res.body[1].should.be.eql('Test-Design2');
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designtypes/Test-Design/designs with multiple DB entries', () => {
        it('it should GET with 200 OK two design named test and test2', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes/Test-Design/designs')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    res.body[0].should.be.eql({user: 'USERID0123456789',name: 'test'});
                    res.body[1].should.be.eql({user: 'USERID0123456789',name: 'test2'});
                    done(err);
                });
        });
    });
    
    describe('GET /api/v1/designtypes/Test-Design/designs/test with multiple DB entries', () => {
        it('it should GET with 200 OK one design named test typed Test-Design, GET with 200 OK one design named test typed Test-Design2, AND GET with 200 OK one design named test2 typed Test-Design', (done) => {
            chai.request(server)
                .get('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user').eql('USERID0123456789');
                    res.body.should.have.property('name').eql('test');
                    res.body.should.have.property('type').eql('Test-Design');
                    res.body.should.have.property('version').eql('0.0');
                    chai.request(server)
                        .get('/api/v1/designtypes/Test-Design2/designs/test')
                        .set('Authorization', 'Bearer USERID0123456789')
                        .end((err2, res2) => {
    //                        console.log('TEST: err2=', err2);
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.have.property('user').eql('USERID0123456789');
                            res2.body.should.have.property('name').eql('test');
                            res2.body.should.have.property('type').eql('Test-Design2');
                            res2.body.should.have.property('version').eql('0.2');
                            chai.request(server)
                                .get('/api/v1/designtypes/Test-Design/designs/test2')
                                .set('Authorization', 'Bearer USERID0123456789')
                                .end((err3, res3) => {
            //                        console.log('TEST: err3=', err3);
                                    res3.should.have.status(200);
                                    res3.body.should.be.a('object');
                                    res3.body.should.have.property('user').eql('USERID0123456789');
                                    res3.body.should.have.property('name').eql('test2');
                                    res3.body.should.have.property('type').eql('Test-Design');
                                    res3.body.should.have.property('version').eql('2.0');
                                    done(err3);
                                });
                        });
                });
        });
    });
    
    describe('POST /api/v1/designtypes/Test-Design/designs/test with multiple DB entries', () => {
        it('it should fail POST with 400 BAD REQUEST, because test already exists', (done) => {
            chai.request(server)
                .post('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .send(testTestDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(400);
                    done(err);
                });
        });
    });
    
    describe('PUT /api/v1/designtypes/Test-Design/designs/test with multiple DB entries', () => {
        it('it should PUT with 200 OK one design named test', (done) => {
            chai.request(server)
                .put('/api/v1/designtypes/Test-Design/designs/test')
                .set('Authorization', 'Bearer USERID0123456789')
                .send(testTestDesign)
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
    describe('DELETE /api/v1/designtypes/Test-Design/designs/test with multiple DB entries', () => {
        it('it should DELETE with 200 OK one design named test', (done) => {
            var name = 'test';
            chai.request(server)
                .delete('/api/v1/designtypes/Test-Design/designs/'+name)
                .set('Authorization', 'Bearer USERID0123456789')
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
// NO LONGER NEEDED BECAUSE STARTUP FILE'S USER IS NULL MAKING IT READ_ONLY
//    describe('DELETE /api/v1/designtypes/Test-Design/designs/Startup with multiple DB entries', () => {
//        it('it should fail DELETE with 400 BAD REQUEST, because name is Startup', (done) => {
//            var name = 'Startup';
//            chai.request(server)
//                .delete('/api/v1/designtypes/Test-Design/designs/'+name)
//                .set('Authorization', 'Bearer USERID0123456789')
//                .end((err, res) => {
////                    console.log('TEST: err=', err);
//                    res.should.have.status(400);
//                    done(err);
//                });
//        });
//    });
    
    describe('POST /api/v1/usage_log with multiple DB entries', () => {
        it('it should POST with 200 OK with note=test', (done) => {
            chai.request(server)
                .post('/api/v1/usage_log')
                .send({ note: 'test'})
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });
    
});
