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

const MAX_SUMMARY_LENGTH = 1000
const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm
const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm

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
    let pageMatch = lunr_pages.filter((page) => page.href === hit.ref)[0];
    pageMatch.score = hit.score;
    pageMatch.matchData = hit.matchData;
    pageMatch.blurb_content = createSearchResultBlurb(query, pageMatch);
    return [pageMatch];
  });
}

function createHighlightedSearchResult(result, pageMatch) {
//  console.log('result=',result,'pageMatch=',pageMatch);
  let searchResultText = "";
  Object.keys(result.matchData.metadata).forEach(function (term) {
      console.log('term=',term);
      Object.keys(result.matchData.metadata[term]).forEach(function (fieldName) {
          console.log('fieldName=',fieldName);
          result.matchData.metadata[term][fieldName].position.forEach((position) => {
              console.log('position=',position);
          });
//          console.log('pageMatch.' + fieldName + '=',pageMatch[fieldName]);
      });
  });
  return searchResultText;
}

if (!String.prototype.matchAll) {
  String.prototype.matchAll = function (regex) {
    "use strict";
    function ensureFlag(flags, flag) {
      return flags.includes(flag) ? flags : flags + flag;
    }
    function* matchAll(str, regex) {
      const localCopy = new RegExp(regex, ensureFlag(regex.flags, "g"));
      let match;
      while ((match = localCopy.exec(str))) {
        match.index = localCopy.lastIndex - match[0].length;
        yield match;
      }
    }
    return matchAll(this, regex);
  };
}

function createSearchResultBlurb(query, pageMatch) {
  const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
  console.log('searchQueryRegex=',searchQueryRegex);
  const searchQueryHits = Array.from(
    pageMatch.content.matchAll(searchQueryRegex),
    (m) => m.index
  );
  console.log('searchQueryHits=',searchQueryHits);
  const sentenceBoundaries = Array.from(
    pageMatch.content.matchAll(SENTENCE_BOUNDARY_REGEX),
    (m) => m.index
  );
  console.log('sentenceBoundaries=',sentenceBoundaries);
  let searchResultText = "";
  let lastEndOfSentence = 0;
  for (const hitLocation of searchQueryHits) {
    if (hitLocation > lastEndOfSentence) {
      for (let i = 0; i < sentenceBoundaries.length; i++) {
        if (sentenceBoundaries[i] > hitLocation) {
          const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0;
          const endOfSentence = sentenceBoundaries[i];
          lastEndOfSentence = endOfSentence;
          let parsedSentence = pageMatch.content.slice(startOfSentence, endOfSentence).trim();
          searchResultText += `${parsedSentence} ... `;
          console.log('hitLocation=',hitLocation,'i=',i,'startOfSentence=',startOfSentence,'endOfSentence=',endOfSentence,'parsedSentence=',parsedSentence,'searchResultText=',searchResultText);
          break;
        }
      }
    }
    const searchResultWords = tokenize(searchResultText);
    const pageBreakers = searchResultWords.filter((word) => word.length > 50);
    if (pageBreakers.length > 0) {
      searchResultText = fixPageBreakers(searchResultText, pageBreakers);
    }
    if (searchResultWords.length >= MAX_SUMMARY_LENGTH) break;
  }
  let style_color = 'style="color:' + getColorForSearchResult(pageMatch.score) + '"'
  return ellipsize(searchResultText, MAX_SUMMARY_LENGTH).replace(
    searchQueryRegex,
    `<strong ${style_color}>$&</strong>`
  );
}

function createQueryStringRegex(query) {
  const searchTerms = query.split(" ");
  if (searchTerms.length == 1) {
    return query;
  }
  query = "";
  for (let term of searchTerms) {
    if (term.startsWith('+') || term.startsWith('-')) term = term.slice(1); // Remove +/- prefix
    query += `${term}|`;
  }
  query = query.slice(0, -1); // Remove trailing '|'
  return `(${query})`;
}

function tokenize(input) {
  const wordMatches = Array.from(input.matchAll(WORD_REGEX), (m) => m);
  return wordMatches.map((m) => ({
    word: m[0],
    start: m.index,
    end: m.index + m[0].length,
    length: m[0].length,
  }));
}

function fixPageBreakers(input, largeWords) {
  largeWords.forEach((word) => {
    const chunked = chunkify(word.word, 20);
    input = input.replace(word.word, chunked);
  });
  return input;
}

function chunkify(input, chunkSize) {
  let output = "";
  let totalChunks = (input.length / chunkSize) | 0;
  let lastChunkIsUneven = input.length % chunkSize > 0;
  if (lastChunkIsUneven) {
    totalChunks += 1;
  }
  for (let i = 0; i < totalChunks; i++) {
    let start = i * chunkSize;
    let end = start + chunkSize;
    if (lastChunkIsUneven && i === totalChunks - 1) {
      end = input.length;
    }
    output += input.slice(start, end) + " ";
  }
  return output;
}

function ellipsize(input, maxLength) {
  const words = tokenize(input);
  if (words.length <= maxLength) {
    return input;
  }
  return input.slice(0, words[maxLength].end) + "...";
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
