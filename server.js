require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
  clientId: process.env.CLIENT_ID,
  assertClaims: {
    aud: 'api://default',
  },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  console.log('SERVER: ===========================================================');

  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

//  console.log('SERVER: In authenticationRequired authHeader=',authHeader);
//  console.log('SERVER: In authenticationRequired match=',match);

  if (!match) {
    console.log('SERVER: 401 - UNAUTHORIZED');
    return res.status(401).end();
  }

  const accessToken = match[1];
  const expectedAudience = 'api://default';

  return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
//      console.log('SERVER: In authenticationRequired jwt=',jwt);
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
//      console.log('SERVER: In authenticationRequired err=',err);
      res.status(401).send(err.message);
      console.log('SERVER: 401 - UNAUTHORIZED');
    });
}

const app = express();

// For local testing only!  Enables CORS for all domains
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

//Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
//app.use(express.static(path.join(__dirname, 'public')));

// Dump debugging output for each request
app.use(function (req, res, next) {
    console.log('SERVER: In USE req.ip=',req.ip,' req.method=',req.method,' req.originalUrl=',req.originalUrl);
    next();
});


function startConnection() {
    var connection;
    if (process.env.NODE_ENV === 'production') {
//        console.log('SERVER: connecting to process.env.JAWSDB_URL');
        connection = mysql.createConnection(process.env.JAWSDB_URL);
    } else if (process.env.NODE_ENV === 'test') {
//        console.log('SERVER: connecting to process.env.JAWSDB_TEAL_URL');
        connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
    } else { // undefined or other - treat as development
//        console.log('SERVER: connecting to process.env.JAWSDB_CYAN_URL');
        connection = mysql.createConnection(process.env.JAWSDB_CYAN_URL);
    }
    connection.connect();
    return connection;
}

// Put all API endpoints under '/api'
// GET - retrieve a particular resource's object or list all objects
// POST - create a new resource's object
// PATCH - make a partial update to a particular resource's object
// PUT - completely overwrite a particular resource's object
// DELETE - remove a particular resource's object
// 200 - OK, The request was successful
// 201 - CREATED, A new resource object was successfully created
// 400 - BAD REQUEST, The request was malformed or invalid
// 401 - UNAUTHORIZED, The client is unauthorized to perform the requested function
// 404 - NOT FOUND, The requested resource could not be found
// 500 - INTERNAL SERVER ERROR, Unknown server error has occurred

app.get('/api/v1/designtypes', authenticationRequired, (req, res) => {
    var value;
    var user = req.jwt.claims.uid;
    console.log('SERVER: In GET /api/v1/designtypes user=',user);
    var connection = startConnection();
    var stmt = 'SELECT DISTINCT type FROM design WHERE (user = \''+user+'\' OR user IS NULL) ORDER BY type';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            throw err;
        } else {
            value = rows.map((row) => {return row.type});
//            console.log('SERVER: After SELECT DISTINCT value=', value);
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});

app.get('/api/v1/designtypes/:type/designs', authenticationRequired, (req, res) => {
    var value;
    var user = req.jwt.claims.uid;
    var type = req.params['type'];
    console.log('SERVER: In GET /api/v1/designtypes/'+type+'/designs user=',user);
    var connection = startConnection();
    var stmt = 'SELECT user, name FROM design WHERE (user = \''+user+'\' OR user IS NULL) AND type = \''+type+'\' ORDER BY name ASC, user DESC';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            throw err;
        } else {
            value = rows.map((row) => {return {user: row.user, name: row.name}});
//            console.log('SERVER: After SELECT value=', value);
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});

app.get('/api/v1/designtypes/:type/designs/:name', authenticationRequired, (req, res) => {
    var type;
    var value;
    var user = req.jwt.claims.uid;
    var type = req.params['type'];
    var name = req.params['name'];
    console.log('SERVER: In GET /api/v1/designtypes/'+type+'/designs/'+name+' user=',user);
    var connection = startConnection();
    var stmt = 'SELECT * FROM design WHERE (user = \''+user+'\' OR user IS NULL) AND type = \''+type+'\' AND name = \''+name+'\' ORDER BY user DESC';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            throw err;
        } else if (rows.length === 0) {
            res.status(404).end();
            connection.end();
            console.log('SERVER: 404 - NOT FOUND');
        } else {
//            console.log('SERVER: After SELECT rows[0]=', rows[0]);
            user = rows[0].user; // Get user from the JSON blob
            type = rows[0].type; // Get type from the JSON blob
            name = rows[0].name; // Get name from the JSON blob
//            console.log('SERVER: After SELECT user=', user, ' name=', name, ' type=', type);
            value = JSON.parse(rows[0].value); // Get value from the JSON blob
            value.user = user; // Insert user into blob
            value.type = type; // Insert type into blob
            value.name = name; // Insert name into blob
//            console.log('SERVER: After SELECT value=', value);
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});


app.post('/api/v1/designtypes/:type/designs/:name', authenticationRequired, (req, res) => {
    var value;
    var user = req.jwt.claims.uid;
    var type = req.params['type'];
    var name = req.params['name'];
    console.log('SERVER: In POST /api/v1/designtypes/'+type+'/designs/'+name+' user=',user);
//    console.log('SERVER: In POST /api/v1/designtypes/'+type+'/designs/'+name,' req.body=',req.body);
    if (req.body === undefined || req.body.length === 0 || req.body.name === undefined) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
        delete req.body.user; // Do not save the user in the blob
        delete req.body.type; // Do not save the type in the blob
        delete req.body.name; // Do not save the name in the blob
        value = JSON.stringify(req.body); // Convert blob to string
        var connection = startConnection();
        var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \''+user+'\' AND type = \''+type+'\' AND name = \''+name+'\'';
//        console.log('SERVER: stmt='+stmt);
        connection.query(stmt, (err, rows, fields) => {
//            console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
                console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                throw err;
            } else if (rows[0].count > 0) {
                res.status(400).end();
                connection.end();
                console.log('SERVER: 400 - BAD REQUEST');
            } else {
//                console.log('SERVER: In POST /api/v1/designs/'+name,' type=', type,' value=', value);
                value = value.replace(/[']/ig,"''"); // replace one single quote with an two single quotes throughout
                var stmt = 'INSERT INTO design (user, type, name, value) VALUES (\''+user+'\',\''+type+'\',\''+name+'\',\''+value+'\')';
//                console.log('SERVER: stmt='+stmt);
                connection.query(stmt, function(err, rows, fields) {
//                    console.log('SERVER: After INSERT err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                        console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                        throw err;
                    } else {
                        value = {};
//                        console.log('SERVER: After INSERT value=', value);
                        res.status(200).json(value);
                        connection.end();
                        console.log('SERVER: 200 - OK');
                    }
                });
            }
        });
    }
});

app.put('/api/v1/designtypes/:type/designs/:name', authenticationRequired, (req, res) => {
    var value;
    var user = req.jwt.claims.uid;
    var type = req.params['type'];
    var name = req.params['name'];
    console.log('SERVER: In PUT /api/v1/designtypes/'+type+'/designs/'+name);
//    console.log('SERVER: In PUT /api/v1/designtypes/'+type+'/designs/'+name+' user=',user,' req.body=',req.body);
    if (req.body === undefined || req.body.length === 0 || req.body.name === undefined) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
        delete req.body.user; // Do not save the user in the blob
        delete req.body.type; // Do not save the type in the blob
        delete req.body.name; // Do not save the name in the blob
        value = JSON.stringify(req.body); // Convert blob to string
        var connection = startConnection();
        var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \''+user+'\' AND type = \''+type+'\' AND name = \''+name+'\'';
//        console.log('SERVER: stmt='+stmt);
        connection.query(stmt, (err, rows, fields) => {
//            console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
                console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                throw err;
            } else if (rows[0].count === 0) {
                res.status(404).end();
                connection.end();
                console.log('SERVER: 404 - NOT FOUND');
            } else {
                value = value.replace(/[']/ig,"''"); // replace one single quote with an two single quotes throughout
                var stmt = 'UPDATE design SET value = \''+value+'\' WHERE user = \''+user+'\' AND type = \''+type+'\' AND name = \''+name+'\'';
//                console.log('SERVER: stmt='+stmt);
                connection.query(stmt, (err, rows, fields) => {
//                    console.log('SERVER: After UPDATE err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                        console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                        throw err;
                    } else {
                        value = {};
//                        console.log('SERVER: After UPDATE value=', value);
                        res.status(200).json(value);
                        connection.end();
                        console.log('SERVER: 200 - OK');
                    }
                });
            }
        });
    }
});

app.delete('/api/v1/designtypes/:type/designs/:name', authenticationRequired, (req, res) => {
    var value;
    var user = req.jwt.claims.uid;
    var type = req.params['type'];
    var name = req.params['name'];
    console.log('SERVER: In DELETE /api/v1/designtypes/'+type+'/designs/'+name+' user=',user);
    var connection = startConnection();
    var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \''+user+'\' AND type = \''+type+'\' AND name = \''+name+'\'';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, (err, rows, fields) => {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            throw err;
        } else if (rows[0].count === 0) {
            res.status(404).end();
            connection.end();
            console.log('SERVER: 404 - NOT FOUND');
        } else {
            var stmt = 'DELETE FROM design WHERE user = \''+user+'\' AND type = \''+type+'\' AND name = \''+name+'\'';
//            console.log('SERVER: stmt='+stmt);
            connection.query(stmt, (err, rows, fields) => {
//                console.log('SERVER: After DELETE err=', err, ' rows=', rows);
                if (err) {
                    res.status(500).end();
                    connection.end();
                    console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                    throw err;
                } else {
                    value = {};
//                    console.log('SERVER: After DELETE value=', value);
                    res.status(200).json(value);
                    connection.end();
                    console.log('SERVER: 200 - OK');
                }
            });
        }
    });
});

app.post('/api/v1/usage_log', (req, res) => {
    var ip_address;
    var note;
    console.log('SERVER: ===========================================================');
    ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('SERVER: In POST /api/v1/usage_log ip_address='+ip_address+' req.body=',req.body);
    note = JSON.stringify(req.body); // Convert blob to string
    var connection = startConnection();
    note = note.replace(/[']/ig,"''"); // replace one single quote with an two single quotes throughout
    var stmt = 'INSERT INTO usage_log (ip_address, note) VALUES (\''+ip_address+'\',\''+note+'\')';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After INSERT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            throw err;
        } else {
            var value = {};
//            console.log('SERVER: After INSERT value=', value);
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});

app.get('/implicit/callback', (req, res) => {
    console.log('SERVER: ===========================================================');
    console.log('SERVER: In GET /implicit/callback');
    res.redirect('http://localhost:3000'+req.originalUrl);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    console.log('SERVER: ===========================================================');
    console.log('SERVER: In GET *');
    console.log("SERVER: In GET * PATH=",path.join(__dirname,'client/build/index.html'));
    res.sendFile(path.join(__dirname,'client/build/index.html'));
    console.log('SERVER: In GET * res=',res);
    res.status(200).end();
    console.log('SERVER: 200 - OK');
});

const port = process.env.PORT || 5000;
if (!module.parent) { // If not in a testcase then start listening
    console.log('SERVER: PUBLIC_URL =',process.env.PUBLIC_URL,'NODE_ENV =',process.env.NODE_ENV,'starting on port =',port,'node version =', process.version);
    app.listen(port);
}

module.exports = app; // for testing
