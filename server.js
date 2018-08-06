require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

function startConnection() {
    var connection;
    if (process.env.NODE_ENV !== 'test') {
        connection = mysql.createConnection(process.env.JAWSDB_URL);
    } else {
        connection = mysql.createConnection(process.env.JAWSDB_TEAL_URL);
    }
    connection.connect();
    return connection;
}

// Put all API endpoints under '/api'
// GET — retrieve a particular resource’s object or list all objects
// POST — create a new resource’s object
// PATCH — make a partial update to a particular resource’s object
// PUT — completely overwrite a particular resource’s object
// DELETE — remove a particular resource’s object
// 200 — OK, The request was successful
// 201 — CREATED, A new resource object was successfully created
// 404 — NOT FOUND, The requested resource could not be found
// 400 — BAD REQUEST, The request was malformed or invalid
// 500 — INTERNAL SERVER ERROR, Unknown server error has occurred

app.get('/api/v1/designtypes', (req, res) => {
    var value;
    console.log('SERVER: ===========================================================');
    console.log('SERVER: In GET /api/v1/designtypes');
    var connection = startConnection();
    var stmt = 'SELECT DISTINCT type FROM design';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
        } else {
            value = rows.map((row) => {return row.type});
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});

app.get('/api/v1/designs', (req, res) => {
    var value;
    console.log('SERVER: ===========================================================');
    console.log('SERVER: In GET /api/v1/designs');
    var connection = startConnection();
    var stmt = 'SELECT name FROM design';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
        } else {
            value = rows.map((row) => {return row.name});
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});

app.get('/api/v1/designs/:name', (req, res) => {
    var type;
    var value;
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In GET /api/v1/designs/'+name);
    var connection = startConnection();
    // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
    var stmt = 'SELECT * FROM design where name = \''+name+'\'';
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
        } else if (rows.length === 0) {
            res.status(404).end();
            connection.end();
            console.log('SERVER: 404 - NOT FOUND');
        } else {
            type = rows[0].type; // Get type from the JSON blob
            value = JSON.parse(rows[0].value); // Get value from the JSON blob
            value.name = name; // Insert name into blob
            value.type = type; // Insert type into blob
//            console.log('SERVER: After SELECT type=', type, ' value=', value);
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});


app.post('/api/v1/designs/:name', (req, res) => {
    var type;
    var value;
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In POST /api/v1/designs/'+name,' req.body=',req.body);
    if (req.body === undefined || req.body.length === 0 || req.body.name === undefined) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
        type = req.body.type; // Get the type from the blob.
        delete req.body.name; // Do not save the name in the blob
        delete req.body.type; // Do not save the type in the blob
        value = JSON.stringify(req.body); // Convert blob to string
        var connection = startConnection();
        // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
        var stmt = 'SELECT COUNT(*) AS count FROM design WHERE name = \''+name+'\'';
//        console.log('SERVER: stmt='+stmt);
        connection.query(stmt, (err, rows, fields) => {
//            console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
                console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            } else if (rows[0].count === 1) {
                res.status(400).end();
                connection.end();
                console.log('SERVER: 400 - BAD REQUEST');
            } else {
//                console.log('SERVER: In POST /api/v1/designs/'+name,' type=', type,' value=', value);
                var stmt = 'INSERT INTO design (name, type, value) VALUES (\''+name+'\',\''+type+'\',\''+value+'\')';
//                console.log('SERVER: stmt='+stmt);
                connection.query(stmt, function(err, rows, fields) {
//                    console.log('SERVER: After INSERT err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                        console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                    } else {
                        value = {};
                        res.status(200).json(value);
                        connection.end();
                        console.log('SERVER: 200 - OK');
                    }
                });
            }
        });
    }
});

app.put('/api/v1/designs/:name', (req, res) => {
    var type;
    var value;
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In PUT /api/v1/designs/'+name,' req.body=',req.body);
    if (req.body === undefined || req.body.length === 0 || req.body.name === undefined) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
        type = req.body.type; // Get the type from the blob.
        delete req.body.name; // Do not save the name in the blob
        delete req.body.type; // Do not save the type in the blob
        value = JSON.stringify(req.body); // Convert blob to string
        var connection = startConnection();
        // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
        var stmt = 'SELECT COUNT(*) AS count FROM design WHERE name = \''+name+'\'';
//        console.log('SERVER: stmt='+stmt);
        connection.query(stmt, (err, rows, fields) => {
//            console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
                console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            } else if (rows[0].count === 0) {
                res.status(404).end();
                connection.end();
                console.log('SERVER: 404 - NOT FOUND');
            } else {
//                console.log('SERVER: In PUT /api/v1/designs/'+name,' type=', type,' value=', value);
                var stmt = 'UPDATE design SET type = \''+type+'\', value = \''+value+'\' WHERE name = \''+name+'\'';
//                console.log('SERVER: stmt='+stmt);
                connection.query(stmt, (err, rows, fields) => {
//                    console.log('SERVER: After UPDATE err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                        console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                    } else {
                        value = {};
                        res.status(200).json(value);
                        connection.end();
                        console.log('SERVER: 200 - OK');
                    }
                });
            }
        });
    }
});

app.delete('/api/v1/designs/:name', (req, res) => {
    var value;
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In DELETE /api/v1/designs/'+name);
    if (name === 'startup') { // Do not let startup be deleted
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
        var connection = startConnection();
        // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
        var stmt = 'SELECT COUNT(*) AS count FROM design WHERE name = \''+name+'\'';
//        console.log('SERVER: stmt='+stmt);
        connection.query(stmt, (err, rows, fields) => {
//            console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
                console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            } else if (rows[0].count === 0) {
                res.status(404).end();
                connection.end();
                console.log('SERVER: 404 - NOT FOUND');
            } else {
                var stmt = 'DELETE FROM design WHERE name = \''+name+'\'';
//                console.log('SERVER: stmt='+stmt);
                connection.query(stmt, (err, rows, fields) => {
//                    console.log('SERVER: After DELETE err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                        console.log('SERVER: 500 - INTERNAL SERVER ERROR');
                    } else {
                        value = {};
                        res.status(200).json(value);
                        connection.end();
                        console.log('SERVER: 200 - OK');
                    }
                });
            }
        });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    console.log('SERVER: ===========================================================');
    console.log('SERVER: In *');
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
    res.status(200).end();
    console.log('SERVER: 200 - OK');
});

const port = process.env.PORT || 5000;
if (!module.parent) { // If not in a testcase then start listening
    console.log('SERVER: Server NODE_ENV=',process.env.NODE_ENV,' starting on port ',port);
    app.listen(port);
}

module.exports = app; // for testing
