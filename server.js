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

function endConnection(connection) {
    connection.end();
}

// Put all API endpoints under '/api'
app.get('/api/v1/designs', (req, res) => {
    console.log('===========================================================');
    console.log('In GET /api/v1/designs');
    var connection = startConnection();
    connection.query('SELECT name FROM design', function(err, rows, fields) {
//        console.log('err=', err, ' rows=', rows);
        if (err) throw err;
        res.json(rows.map((row,index) => {return row.name}));
    });
    endConnection(connection);
});

app.get('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    var name = req.params['name'];
    console.log('In GET /api/v1/designs/'+name);
    if (name === undefined || name.length === 0) {
        res.status(400).end();
    } else {
        var connection = startConnection();
        // The name column is defined as UNIQUE. You can only get 0 or 1 rows at most.
        connection.query('SELECT value FROM design where name = \''+name+'\'', function(err, rows, fields) {
//            console.log('err=', err, ' rows=', rows);
            if (err) throw err;
            if (rows.length === 0) {
                res.status(404).end();
            } else {
                var value = JSON.parse(rows[0].value);
                value.name = name; // Insert name into value
//                console.log('value=', value);
                res.json(value);
            }
        });
        endConnection(connection);
    }
});


app.post('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    var name = req.params['name'];
    console.log('In POST /api/v1/designs/'+name);
    var value = JSON.stringify(req.body);
    delete value.name; // Do not save the value with the old name
//    console.log('value=', value);
    var connection = startConnection();
    connection.query('INSERT INTO design (name, value) VALUES (\''+name+'\',\''+value+'\')', function(err, rows, fields) {
//        console.log('err=', err, ' rows=', rows);
        if (err) throw err;
        res.end();
    });
    endConnection(connection);
});

app.put('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    var name = req.params['name'];
    console.log('In PUT /api/v1/designs/'+name);
    var value = req.params['value'];
    delete value.name; // Do not save the value with the old name
//    console.log('value=', value);
    var connection = startConnection();
    connection.query('UPDATE design SET value = \''+value+'\' WHERE name = \''+name+'\'', (err, rows, fields) => {
//        console.log('err=', err, ' rows=', rows);
        if (err) throw err;
        res.end();
    });
    endConnection(connection);
});

app.delete('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    var name = req.params['name'];
    console.log('In DELETE /api/v1/designs/'+name);
    if (name === undefined || name.length === 0) {
        res.status(400).end();
    } else {
        var connection = startConnection();
        connection.query('SELECT * FROM design WHERE name = \''+name+'\'', (err, rows, fields) => {
//            console.log('err=', err, ' rows=', rows);
            if (err) throw err;
            if (rows.length === 0) {
                res.status(404).end();
            } else {
                connection.query('DELETE FROM design WHERE name = \''+name+'\'', (err, rows, fields) => {
//                    console.log('err=', err, ' rows=', rows);
                    if (err) throw err;
                    res.status(201).end();
                });
            }
        });
        endConnection(connection);
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    console.log('===========================================================');
    console.log('In *');
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
    res.end();
});

const port = process.env.PORT || 5000;
if (!module.parent) { // If not in a testcase then start listening
    console.log('Server NODE_ENV='+process.env.NODE_ENV+' starting on port '+port);
    app.listen(port);
}

module.exports = app; // for testing
