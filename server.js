require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');
var lunr = require("lunr");
var lunr_index = require("./lunr_index.json");
var lunr_pages = require("./lunr_pages.json");

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
    console.log('SERVER: In USE req.originalUrl=',req.originalUrl,'req.ip=',req.ip,'req.method=',req.method);
    next();
});

// Check for nasty input
app.use((req, res, next) => {
    var found = req.originalUrl.match(/\/\?\d+=/); // Example '/?5129='
    if (found) {
        res.status(500).end();
    } else {
        next();
    }
})

function startConnection() {
    var connection;
    if (process.env.NODE_ENV === "test") { // Are we running on test?
//        console.log('SERVER: In Connecting process.env.JAWSDB_TEST_URL=',process.env.JAWSDB_TEST_UR);
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
//    console.log('SERVER: In POST /api/v1/usage_log ip_address='+ip_address+' req.body=',req.body);
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

const SENTENCE_SEPARATOR = ' <> ';

var searchIndex = lunr.Index.load(lunr_index);

app.get('/api/v1/search', (req, res) => {
//    console.log('SERVER: req=',req);
    var terms = req.query.terms;
    const results = searchSite(terms);
//    console.log('SERVER: results=',results);
    res.status(200).json(results);
    console.log('SERVER: 200 - OK');
});

function searchSite(query) {
  let results = getSearchResults(query);
  return results.length
    ? results
    : [];
}

function getSearchResults(query) {
  return searchIndex.search(query).flatMap((hit) => {
    if (hit.ref == "undefined") return [];
    let pageMatch = JSON.parse(JSON.stringify(lunr_pages.filter((page) => page.href === hit.ref)[0])); // Make clone
    pageMatch.score = hit.score;
    pageMatch.matchData = hit.matchData;
    pageMatch.sentence_text = createSentenceSearchResult(pageMatch);
    pageMatch.highlight_text = createHighlightSearchResult(pageMatch);
    return [pageMatch];
  });
}

function createSentenceSearchResult(pageMatch) {
//  console.log('In createSentenceSearchResult pageMatch=',pageMatch);
//  console.log('In createSentenceSearchResult pageMatch.href=',pageMatch.href);
  let sentenceData = [];
  Object.keys(pageMatch.matchData.metadata).forEach(function (term) {
//      console.log('In createSentenceSearchResult term=',term);
      Object.keys(pageMatch.matchData.metadata[term]).forEach(function (fieldName) {
          if (fieldName === 'sentence_text') { // Only highlight content
//              console.log('In createSentenceSearchResult fieldName=',fieldName);
              let hit = pageMatch[fieldName];
//              console.log('In createSentenceSearchResult hit=',hit);
              pageMatch.matchData.metadata[term][fieldName].position.forEach((position) => {
//                  console.log('In createSentenceSearchResult position=',position);
                  let lio = hit.lastIndexOf(SENTENCE_SEPARATOR,position[0])+SENTENCE_SEPARATOR.length;
                  if (sentenceData[lio] === undefined) {
                      sentenceData[lio] = [];
                  }
                  let position_clone = Object.assign({},position); // clone it
                  position_clone[0] = position_clone[0]-lio;
//                  console.log('In createSentenceSearchResult lio=',lio,'position=',position);
                  sentenceData[lio].push(position_clone);
                  sentenceData[lio].sort((a, b) => a[0] - b[0]); // Put in position order
              });
          }
      });
  });
//  console.log('In createSentenceSearchResult sentenceData=',sentenceData);
  let searchResultText = "";
  let style_color = 'style="color:' + getColorForSearchResult(pageMatch.score) + '"'
  let hit = pageMatch.sentence_text;
  Object.keys(sentenceData).forEach(function (lio) {
    let io = hit.indexOf(SENTENCE_SEPARATOR,lio);
//    console.log('In createSentenceSearchResult lio=',lio,'io=',io);
    let offset = 0;
    let sentence = hit.slice(lio,io);
    sentenceData[lio].forEach((position) => {
//      console.log('In createSentenceSearchResult offset=',offset,'position=',position);
      let prefix = sentence.slice(0,offset+position[0]);
      let strong_prefix = `<strong ${style_color}>`;
      let text = sentence.substr(offset+position[0],position[1]);
      let strong_suffix = '</strong>';
      let suffix = sentence.slice(offset+position[0]+position[1]);
//      console.log('In createSentenceSearchResult prefix=',prefix,'strong_prefix=',strong_prefix,'text=',text,',strong_suffix=',strong_suffix,'suffix=',suffix);
      sentence = prefix + strong_prefix + text + strong_suffix + suffix;
      offset += strong_prefix.length + strong_suffix.length;
    });
    let ellipsis = ' ... ';
    searchResultText += sentence + ellipsis;
  });

//  console.log('In createSentenceSearchResult searchResultText=',searchResultText);
  return searchResultText;
}

function createHighlightSearchResult(pageMatch) {
//  console.log('In createHighlightSearchResult result=',result,'pageMatch=',pageMatch);
  let searchResultHighlights = [];
  Object.keys(pageMatch.matchData.metadata).forEach(function (term) {
//      console.log('In createHighlightSearchResult term=',term);
      Object.keys(pageMatch.matchData.metadata[term]).forEach(function (fieldName) {
//          console.log('In createHighlightSearchResult fieldName=',fieldName);
          if (fieldName === 'highlight_text') {
              pageMatch.matchData.metadata[term][fieldName].position.forEach((position) => {
//                console.log('In createHighlightSearchResult position=',position);
                searchResultHighlights.push(position);
              });
          }
      });
  });
//  console.log('In createHighlightSearchResult searchResultHighlights=',searchResultHighlights);
  return searchResultHighlights;
}

function getColorForSearchResult(score) {
  const warmColorSat = 100;
  const coolColorSat = 30;
  return adjustSat(warmColorSat, coolColorSat, score);
}

function adjustSat(sat1, sat2, score) {
  var satAdjust = 0.0;
  var newSat = sat1;
  if (score <= 3) {
    satAdjust = (parseFloat(score) / 3) * (sat1 - sat2);
    newSat = sat2 + Math.floor(satAdjust);
  }
  return `hsl(122, ${newSat}%, 35%)`;
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//    console.log('process.env.NODE_ENV == Production or staging');
    // If it’s not https already, redirect the same url on https.
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        console.log("SERVER: In USE Redirect PATH=",path.join(__dirname, 'client/build', 'index.html'));
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
//        console.log("SERVER: In USE next");
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
} else {
//    console.log('process.env.NODE_ENV != production or staging');
}

const port = process.env.PORT || 5000;
if (!module.parent) { // If not in a testcase then start listening
    console.log('SERVER: PUBLIC_URL =', process.env.PUBLIC_URL, 'NODE_ENV =', process.env.NODE_ENV, 'starting on port =', port, 'node version =', process.version);
    app.listen(port);
}

module.exports = app; // for testing
