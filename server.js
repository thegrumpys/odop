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
app.get('/api/v1/designs', (req, res) => {
    console.log('SERVER: ===========================================================');
    console.log('SERVER: In GET /api/v1/designs');
    var connection = startConnection();
    connection.query('SELECT name FROM design', function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
        } else {
            res.json(rows.map((row,index) => {return row.name}));
            connection.end();
        }
    });
});

app.get('/api/v1/designs/:name', (req, res) => {
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In GET /api/v1/designs/'+name);
    var connection = startConnection();
    // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
    connection.query('SELECT value FROM design where name = \''+name+'\'', function(err, rows, fields) {
//            console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
        } else if (rows.length === 0) {
            res.status(404).end();
            connection.end();
        } else {
            var value = JSON.parse(rows[0].value);
            value.name = name; // Insert name into value
//                console.log('SERVER: After SELECT value=', value);
            res.json(value);
            connection.end();
        }
    });
});


app.post('/api/v1/designs/:name', (req, res) => {
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In POST /api/v1/designs/'+name);
    if (req.body === undefined || req.body.length === 0 || req.body.name === undefined) {
        res.status(400).end();
    } else {
        var value = JSON.stringify(req.body);
        var connection = startConnection();
        // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
        connection.query('SELECT COUNT(*) AS count FROM design WHERE name = \''+name+'\'', (err, rows, fields) => {
//                    console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
            } else if (rows[0].count === 1) {
                res.status(400).end();
                connection.end();
            } else {
                delete value.name; // Do not save the old name
//                        console.log('SERVER: In POST /api/v1/designs/'+name+' value=', value);
                connection.query('INSERT INTO design (name, value) VALUES (\''+name+'\',\''+value+'\')', function(err, rows, fields) {
//                            console.log('SERVER: After INSERT err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                    } else {
                        res.end();
                        connection.end();
                    }
                });
            }
        });
    }
});

app.put('/api/v1/designs/:name', (req, res) => {
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In PUT /api/v1/designs/'+name);
    if (req.body === undefined || req.body.length === 0 || req.body.name === undefined) {
        res.status(400).end();
    } else {
        var value = JSON.stringify(req.body);
        var connection = startConnection();
        // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
        connection.query('SELECT COUNT(*) AS count FROM design WHERE name = \''+name+'\'', (err, rows, fields) => {
//                console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
            } else if (rows[0].count === 0) {
                res.status(404).end();
                connection.end();
            } else {
                delete value.name; // Do not save the old name
//                    console.log('SERVER: In PUT /api/v1/designs/'+name+' value=', value);
                connection.query('UPDATE design SET value = \''+value+'\' WHERE name = \''+name+'\'', (err, rows, fields) => {
//                        console.log('SERVER: After UPDATE err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                    } else {
                        res.end();
                        connection.end();
                    }
                });
            }
        });
    }
});

app.delete('/api/v1/designs/:name', (req, res) => {
    console.log('SERVER: ===========================================================');
    var name = req.params['name'];
    console.log('SERVER: In DELETE /api/v1/designs/'+name);
    if (name === undefined || name.length === 0) {
        res.status(400).end();
    } else {
        var connection = startConnection();
        // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
        connection.query('SELECT COUNT(*) AS count FROM design WHERE name = \''+name+'\'', (err, rows, fields) => {
//            console.log('SERVER: After SELECT err=', err, ' rows=', rows);
            if (err) {
                res.status(500).end();
                connection.end();
            } else if (rows[0].count === 0) {
                res.status(404).end();
                connection.end();
            } else {
                connection.query('DELETE FROM design WHERE name = \''+name+'\'', (err, rows, fields) => {
//                    console.log('SERVER: After DELETE err=', err, ' rows=', rows);
                    if (err) {
                        res.status(500).end();
                        connection.end();
                    } else {
                        res.status(200).end();
                        connection.end();
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
    res.end();
});

const port = process.env.PORT || 5000;
if (!module.parent) { // If not in a testcase then start listening
    console.log('SERVER: Server NODE_ENV='+process.env.NODE_ENV+' starting on port '+port);
    app.listen(port);
}

module.exports = app; // for testing
