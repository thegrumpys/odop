require("dotenv").config();

process.env.NODE_ENV = "test";

const mysql = require("mysql");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
let userId;
let newUserId;

chai.use(chaiHttp);

describe("Admin User Manager", () => {
  before((done) => {
    var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
    connection.connect();
    const stmt =
      "INSERT INTO user (email, first_name, last_name, role, token, status, last_login_at) VALUES ('search@example.com','First','Last','admin','ADMINTOKEN','active','2000-01-01 00:00:00')";
    connection.query(stmt, function (err, results) {
      if (!err) userId = results.insertId;
      connection.end();
      done(err);
    });
  });

  after((done) => {
    var connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
    connection.connect();
    connection.query("DELETE FROM user WHERE id = ?", [userId], function (err) {
      connection.end();
      done(err);
    });
  });

  it("should fail without auth", (done) => {
    chai
      .request(server)
      .get("/api/v1/users")
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });

  it("should create user", (done) => {
    chai
      .request(server)
      .post("/api/v1/users")
      .set("Authorization", "Bearer ADMINTOKEN")
      .send({
        email: "newuser@example.com",
        password: "Valid123",
        first_name: "New",
        last_name: "User",
        role: "user",
        status: "active",
        token: "NEWTOKEN",
      })
      .end((err, res) => {
        res.should.have.status(201);
        newUserId = res.body.id;
        done(err);
      });
  });

  it("should get user list by email", (done) => {
    chai
      .request(server)
      .get("/api/v1/users?email=search@example.com")
      .set("Authorization", "Bearer ADMINTOKEN")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have.property("token");
        done(err);
      });
  });

  it("should update user role", (done) => {
    chai
      .request(server)
      .put(`/api/v1/users/${newUserId}`)
      .set("Authorization", "Bearer ADMINTOKEN")
      .send({ role: "admin" })
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });

  it("should update user token", (done) => {
    chai
      .request(server)
      .put(`/api/v1/users/${newUserId}`)
      .set("Authorization", "Bearer ADMINTOKEN")
      .send({ token: "UPDATEDTOKEN" })
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });

  it("should get user by token", (done) => {
    chai
      .request(server)
      .get("/api/v1/users?token=UPDATEDTOKEN")
      .set("Authorization", "Bearer ADMINTOKEN")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done(err);
      });
  });

  it('should get users within created date range', (done) => {
    const start = '1970-01-01T00:00:00';
    const end = '2999-12-31T23:59:59';
    chai
      .request(server)
      .get(
        `/api/v1/users?createStartDate=${encodeURIComponent(start)}&createEndDate=${encodeURIComponent(end)}`,
      )
      .set('Authorization', 'Bearer ADMINTOKEN')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
        done(err);
      });
  });

  it('should get users within last login date range', (done) => {
    const start = '1970-01-01T00:00:00';
    const end = '2999-12-31T23:59:59';
    chai
      .request(server)
      .get(
        `/api/v1/users?loginStartDate=${encodeURIComponent(start)}&loginEndDate=${encodeURIComponent(end)}`,
      )
      .set('Authorization', 'Bearer ADMINTOKEN')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
        done(err);
      });
  });

  it("should delete new user", (done) => {
    chai
      .request(server)
      .delete(`/api/v1/users/${newUserId}`)
      .set("Authorization", "Bearer ADMINTOKEN")
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });
});
