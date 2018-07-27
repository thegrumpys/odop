const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/v1/designs', (req, res) => {
    console.log('===========================================================');
    console.log('In GET /api/v1/designs');
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    connection.query('SELECT name FROM design', function(err, rows, fields) {
//        console.log(err);
//        console.log(rows);
//        console.log(fields);
        if (err) throw err;
        res.json(rows.map((row,index) => {return row.name}));
    });
    connection.end();
});

app.get('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    console.log('In GET /api/v1/designs/:name');
    var name = req.params['name'];
    console.log('name='+name);
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    connection.query('SELECT value FROM design where name = \''+name+'\'', function(err, rows, fields) {
//        console.log(err);
//        console.log(rows);
//        console.log(fields);
        if (err) throw err;
        if (rows.length == 1) res.json(JSON.parse(rows[0].value));
    });
    connection.end();
});


app.post('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    console.log('In POST /api/v1/designs/:name');
    var name = req.params['name'];
    var value = JSON.stringify(req.body.value);
    console.log('name='+name+' value='+value);
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
//    INSERT INTO table_name (column1, column2, column3, ...)
//    VALUES (value1, value2, value3, ...);
    connection.query('INSERT INTO design (name, value) VALUES (\''+name+'\',\''+value+'\')', function(err, rows, fields) {
//        console.log(err);
//        console.log(rows);
//        console.log(fields);
        if (err) throw err;
        res.end();
    });
    connection.end();
});

app.put('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    console.log('In PUT /api/v1/designs/:name');
    var name = req.params['name'];
    var value = req.params['value'];
    console.log('name='+name+' value='+value);
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
//    UPDATE table_name
//    SET column1 = value1, column2 = value2, ...
//    WHERE condition;
    connection.query('UPDATE design SET value = \''+value+'\' WHERE name = \''+name+'\'', function(err, rows, fields) {
//        console.log(err);
//        console.log(rows);
//        console.log(fields);
        if (err) throw err;
        res.end();
    });
    connection.end();
});

app.delete('/api/v1/designs/:name', (req, res) => {
    console.log('===========================================================');
    console.log('In DELETE /api/v1/designs/:name');
    var name = req.params['name'];
    console.log('name='+name);
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
//    DELETE FROM table_name
//    WHERE condition;
    connection.query('DELETE FROM design WHERE name = \''+name+'\'', function(err, rows, fields) {
//        console.log(err);
//        console.log(rows);
//        console.log(fields);
        if (err) throw err;
        res.end();
    });
    connection.end();
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
console.log('Server NODE_ENV='+process.env.NODE_ENV+' starting on port '+port);
app.listen(port);

module.exports = app; // for testing
