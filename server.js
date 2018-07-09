var {createServer} = require('http'); 
var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');

var app = express();
var dev = app.get('env') !== 'production';

if (!dev) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));

    console.log('public url: ', process.env.PUBLIC_URL)
    var staticPath = path.resolve(__dirname, 'build');
    console.log('production staticPath='+staticPath);
    app.use(express.static(staticPath));
    
    app.get('*', function(req,res){
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
} else {
    app.use(morgan('dev'));

    console.log('public url: ', process.env.PUBLIC_URL)
    var staticPath = path.join(__dirname, '/');
    console.log('development staticPath='+staticPath);
    app.use(express.static(staticPath));
}

var server = createServer(app);

server.listen(process.env.PORT || 3000, function(err) {
    if (err) throw err;
    console.log('Server started!');
});
