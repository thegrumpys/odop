const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/designs', (req, res) => {
    console.log('===========================================================');
    console.log('In /api/designs');
    var mysql = require('mysql');
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    connection.query('SELECT name FROM design', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
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
console.log('Server starting on port '+port);
app.listen(port);
