require('dotenv').config();

process.env.NODE_ENV = 'test';

const mysql = require('mysql');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//========================================================================================

describe('Log Usage', () => {

    describe('POST /api/v1/usage_log/ip_address/66.68.47.92', () => {
        it('it should POST with 200 OK with note=test', (done) => {
            chai.request(server)
                .post('/api/v1/usage_log')
                .send({ note: "test"})
                .end((err, res) => {
//                    console.log('TEST: err=', err);
                    res.should.have.status(200);
                    done(err);
                });
        });
    });

});
