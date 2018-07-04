var {createServer} = require('http'); 
var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', function(req,res){
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

var server = createServer(app);

server.listen(process.env.PORT || 5000, function(err) {
    if (err) throw err;
    console.log('Server started!');
});
