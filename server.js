require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');

/**
 * A simple middleware that asserts valid user name and sends 401 responses
 * if the token is not present.  If the token is present its
 * contents are attached to request
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

//  console.log('SERVER: In authenticationRequired authHeader=',authHeader);
//  console.log('SERVER: In authenticationRequired match=',match);

  if (!match) {
    console.log('SERVER: 401 - UNAUTHORIZED');
    return res.status(401).end();
  }

  req.uid = match[1];
//  console.log('SERVER: In authenticationRequired req.uid=',req.uid);
  next();
}

const app = express();

// For local testing only!  Enables CORS for all domains
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

// Dump debugging output for each request
app.use(function (req, res, next) {
    console.log('SERVER: ===========================================================');
    console.log('SERVER: In USE req.ip=',req.ip,' req.method=',req.method,' req.originalUrl=',req.originalUrl);
    next();
});


function startConnection() {
    var connection;
    if (process.env.NODE_ENV === "test") { // Are we running on test?
//        console.log('SERVER: In Connecting process.env.JAWSDB_TEST_URL
        connection = mysql.createConnection(process.env.JAWSDB_TEST_URL);
    } else { // Are we running anywhere else: production, staging, or development?
//        console.log('SERVER: In Connecting process.env.JAWSDB_URL=', process.env.JAWSDB_URL);
        connection = mysql.createConnection(process.env.JAWSDB_URL);
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
    var user = req.uid;
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
    var user = req.uid;
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
    var user = req.uid;
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
            type = rows[0].type; // Get type from the JSON blob
//            console.log('SERVER: After SELECT user=',user,'name=',name, 'type=',type);
            value = JSON.parse(rows[0].value); // Get value from the JSON blob
            value.type = type; // Insert type into blob
//            console.log('SERVER: After SELECT value=', value);
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});


app.post('/api/v1/designtypes/:type/designs/:name', authenticationRequired, (req, res) => {
    var value;
    var user = req.uid;
    var type = req.body.type;
    var name = req.params['name'];
    console.log('SERVER: In POST /api/v1/designtypes/'+type+'/designs/'+name+' user=',user);
//    console.log('SERVER: In POST /api/v1/designtypes/'+type+'/designs/'+name,' req.body=',req.body);
    if (req.uid === "null" || req.body === undefined || req.body.length === 0 || req.body.type === undefined || req.body.type !== req.params['type']) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
        delete req.body.type; // Do not save the type in the blob
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
//                console.log('SERVER: In POST /api/v1/designs/'+name,'type=',type,'value=',value);
                value = value.replace(/[']/ig,"''") // replace one single quote with an two single quotes throughout
                             .replace(/\\n/g, "\\\\n")
                             .replace(/\\'/g, "\\\\'")
                             .replace(/\\"/g, '\\\\"')
                             .replace(/\\&/g, "\\\\&")
                             .replace(/\\r/g, "\\\\r")
                             .replace(/\\t/g, "\\\\t")
                             .replace(/\\b/g, "\\\\b")
                             .replace(/\\f/g, "\\\\f");
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
    var user = req.uid;
    var type = req.body.type;
    var name = req.params['name'];
    console.log('SERVER: In PUT /api/v1/designtypes/'+type+'/designs/'+name);
//    console.log('SERVER: In PUT /api/v1/designtypes/'+type+'/designs/'+name+' user=',user,' req.body=',req.body);
    if (req.uid === "null" || req.body === undefined || req.body.length === 0 || req.body.type === undefined || req.body.type !== req.params['type']) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
        delete req.body.type; // Do not save the type in the blob
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
//                console.log('SERVER: In PUT /api/v1/designs/'+name,'type=',type,'value=',value);
                value = value.replace(/[']/ig,"''") // replace one single quote with an two single quotes throughout
                             .replace(/\\n/g, "\\\\n")
                             .replace(/\\'/g, "\\\\'")
                             .replace(/\\"/g, '\\\\"')
                             .replace(/\\&/g, "\\\\&")
                             .replace(/\\r/g, "\\\\r")
                             .replace(/\\t/g, "\\\\t")
                             .replace(/\\b/g, "\\\\b")
                             .replace(/\\f/g, "\\\\f");
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
    var user = req.uid;
    var type = req.params['type'];
    var name = req.params['name'];
    console.log('SERVER: In DELETE /api/v1/designtypes/'+type+'/designs/'+name+' user=',user);
    if (req.uid === "null") {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
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
                var stmt = 'DELETE FROM design WHERE user = \''+user+'\' AND type = \''+type+'\' AND name = \''+name+'\'';
//                console.log('SERVER: stmt='+stmt);
                connection.query(stmt, (err, rows, fields) => {
//                    console.log('SERVER: After DELETE err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                        console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                        throw err;
                    } else {
                        value = {};
//                        console.log('SERVER: After DELETE value=', value);
                        res.status(200).json(value);
                        connection.end();
                        console.log('SERVER: 200 - OK');
                    }
                });
            }
        });
    }
});

app.post('/api/v1/usage_log', (req, res) => {
    var ip_address;
    var note;
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

if (process.env.NODE_ENV === 'production') {
    // If it’s not https already, redirect the same url on https.
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        console.log("SERVER: In USE Redirect PATH=",path.join(__dirname, 'client/build', 'index.html'));
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
        next();
      }
    })
    // Serve any static files
    app.use(
        express.static(path.join(__dirname, 'client/build'))
    );
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res, next) {
      console.log("SERVER: In GET * PATH=",path.join(__dirname, 'client/build', 'index.html'));
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
if (!module.parent) { // If not in a testcase then start listening
    console.log('SERVER: PUBLIC_URL =', process.env.PUBLIC_URL, 'NODE_ENV =', process.env.NODE_ENV, 'starting on port =', port, 'node version =', process.version);
    app.listen(port);
}

module.exports = app; // for testing
