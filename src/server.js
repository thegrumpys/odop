import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import lunr from "lunr";
import lunr_index from "../lunr_index.json" with { type: "json" };
import lunr_pages from "../lunr_pages.json" with { type: "json" };
import store from "./store/store.js";
import { load } from "./store/actions.js";
import { init } from './designtypes/Spring/Compression/init.js';
import { eqnset } from './designtypes/Spring/Compression/eqnset.js';
import * as o from "./designtypes/Spring/Compression/symbol_table_offsets.js"
import m_tab from './designtypes/Spring/mat_us.json' with { type: "json" };
import * as mo from './designtypes/Spring/mat_offsets.js';
import et_tab from './designtypes/Spring/Compression/endtypes.json' with { type: "json" };
import * as eo from './designtypes/Spring/Compression/endtypes_offsets.js';
import { CONSTRAINED, FIXED } from './store/actionTypes.js';
dotenv.config();
const __dirname = import.meta.dirname;

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
    var found = req.originalUrl.match(/\/\?\d+/); // Example '/?5129='
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

app.get('/api/v1/db_size', authenticationRequired, (req, res) => {
    var value;
    var user = req.uid;
    console.log('SERVER: In GET /api/v1/db_size user=',user);
    var connection = startConnection();
    var stmt = `
SELECT NOW() AS date_time, s.schema_name AS schema_name, sp.grantee AS user, CAST(ROUND(SUM(COALESCE(t.data_length + t.index_length, 0)) / 1024 / 1024, 3) AS CHAR) AS db_size_mb, sp.has_insert AS has_insert
FROM information_schema.schemata AS s
INNER JOIN information_schema.tables AS t
ON s.schema_name = t.table_schema
INNER JOIN (
    SELECT spi.grantee,spi.table_schema,MAX(
        CASE
            WHEN spi.privilege_type = 'INSERT' THEN 1
            ELSE 0
        END
    ) has_insert
    FROM information_schema.schema_privileges AS spi
    GROUP BY spi.grantee, spi.table_schema
) AS sp
ON s.schema_name = sp.table_schema
GROUP BY s.schema_name, sp.grantee, sp.has_insert`;
//    console.log('SERVER: stmt='+stmt);
    connection.query(stmt, function(err, rows, fields) {
//        console.log('SERVER: After SELECT err=', err, ' rows=', rows);
        if (err) {
            res.status(500).end();
            connection.end();
            console.log('SERVER: 500 - INTERNAL SERVER ERROR');
            throw err;
        } else {
            value = rows.map((row) => {return row.db_size_mb});
//            console.log('SERVER: After SELECT DISTINCT value=', value);
            res.status(200).json(value);
            connection.end();
            console.log('SERVER: 200 - OK');
        }
    });
});

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
    console.log('SERVER: In PUT /api/v1/designtypes/'+type+'/designs/'+name+' user=',user,' req.body=',req.body);
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
//    console.log('SERVER: In POST /api/v1/usage_log ip_address='+ip_address+' note=',note);
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

app.get('/api/v1/catalogs/:type', (req, res) => {
  var type = req.params['type'];
  console.log('SERVER: In GET /api/v1/catalogs/'+type);
  var connection = startConnection();
  var stmt =
    'SELECT DISTINCT c.name AS catalog_name, ca.name AS catalog_alias_name, c.id as catalog_id \
     FROM catalog c \
     LEFT JOIN catalog_alias ca \
     ON c.id = ca.catalog_id \
     LEFT JOIN catalog_entry ce \
     ON c.id = ce.catalog_id \
     LEFT JOIN spring_type st \
     ON ce.spring_type_id = st.id \
     WHERE st.name = \''+type+'\' \
     ORDER BY c.name';
  console.log('SERVER: stmt=' + stmt);
  connection.query(stmt, function(err, rows) {
    console.log('SERVER: After SELECT err=', err, ' rows=', rows);
    if (err) {
      res.status(500).end();
      connection.end();
      console.log('SERVER: 500 - INTERNAL SERVER ERROR');
      throw err;
    } else {
      var value = rows.map((row) => { return { name: row.catalog_name, alias: (row.catalog_alias_name!==null ? row.catalog_alias_name : ''), number: row.catalog_id } });
      console.log('SERVER: After SELECT DISTINCT value=', value);
      res.status(200).json(value);
      connection.end();
      console.log('SERVER: 200 - OK');
    }
  });
});

function getObjectiveValue(st, viol_wt) {
//    console.log('In getObjectiveValue st=',st,'viol_wt=',viol_wt);
    var element;
    var vmin;
    var vmax;
    var viol_sum = 0.0;
    var result;

    for (let i = 0; i < st.length; i++) {
        element = st[i];
        if (element.type === "equationset" && element.input) {
            vmin = 0.0;
            vmax = 0.0;
            if (element.lmin & CONSTRAINED ) { // TODO: || element.lmin < FREESTAT) {
                vmin = (-element.value + element.cmin) / element.smin;
            }
            if (element.lmax & CONSTRAINED ) { // TODO: || element.lmax < FREESTAT) {
                vmax = ( element.value - element.cmax) / element.smax;
            }
            if (vmin > 0.0) {
                viol_sum = viol_sum + vmin * vmin;
            }
            if (vmax > 0.0) {
                viol_sum = viol_sum + vmax * vmax;
            }
        }
    }
    for (let i = 0; i < st.length; i++) {
        element = st[i];
        if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
            vmin = 0.0;
            vmax = 0.0;
            /* State variable fix levels. */
            /*
             * The fix_wt's are automatically incorporated in the scaling denominators
             * S(I+N) by the main routine.
             *
             * This version reduces penalty of large fix violations.
             */
            if (element.lmin & FIXED) {
                vmin = (-element.value + element.cmin) / element.smin;
                vmax = -vmin;
                if (vmin > 1.0) {
                    viol_sum = viol_sum + vmin;
                } else if (vmin < -1.0) {
                    viol_sum = viol_sum - vmin;
                } else {
                    viol_sum = viol_sum + vmin * vmin;
                }
            } else {
                if (element.lmin & CONSTRAINED ) {
                    vmin = (-element.value + element.cmin) / element.smin;
//                console.log('name=',element.name,' vmin=',vmin,' value=',element.value,' cmin=',element.cmin,' smin=',element.smin);
                }
                if (element.lmax & CONSTRAINED ) {
                    vmax = ( element.value - element.cmax) / element.smax;
//                console.log('name=',element.name,' vmax=',vmax,' value=',element.value,' cmax=',element.cmax,' smax=',element.smax);
                }
                if (vmin > 0.0) {
                    viol_sum = viol_sum + vmin * vmin;
                }
                if (vmax > 0.0) {
                    viol_sum = viol_sum + vmax * vmax;
                }
            }
        }
    }

    // Return Objective Value
    result = viol_wt * viol_sum;
//    console.log('In getObjectiveValue result=',result);
    return result;
}

function convertToResultArray(entry) {
//    console.log('In convertToResultArray entry=',entry);
    var result;
    var catalog_select = entry[0].replace('-', '\u2011');
    var entry_select = entry[1].replace('-', '\u2011');
    var entry_table = `OD_Free:\u00A0${entry[2]}, Wire_Dia:\u00A0${entry[3]}, L_Free:\u00A0${entry[4]}, Coils_T:\u00A0${entry[5]}, Material_Type:\u00A0${entry[6]}, End_Type:\u00A0${entry[7]}, Obj:\u00A0${entry[10]}`;
    // Convert to changeSymbolValue array
    var entry_symbol_values = [];
    entry_symbol_values.push(['OD_Free',entry[2]]);
    entry_symbol_values.push(['Wire_Dia',entry[3]]);
    entry_symbol_values.push(['L_Free',entry[4]]);
    entry_symbol_values.push(['Coils_T',entry[5]]);
    entry_symbol_values.push(['Material_Type',entry[8]]);
    entry_symbol_values.push(['End_Type',entry[9]]);
    result = [catalog_select, entry_select, entry_table, entry_symbol_values];
//    console.log('In convertToResultArray result=',result);
    return result;
}

export function getCatalogEntries(catalog, store, st, viol_wt) {
//    console.log('Entering getCatalogEntries name=',name,' store=',store,' st=',st,' viol_wt=',viol_wt);
    var catalog, entry;
    var result = [];
    var p, x, offset;
    var objective_value;
    var cat0, cat1, cat2, cat3;
    function findMaterialTypeIndex(element, index) {
//        console.log('In findMaterialTypeIndex element=',element,' index=',index,' element[mo.matnam]=',element[mo.matnam],' entry[5]=',entry[5]);
        return index > 0 && element[mo.matnam] === entry[6];
    }
    function findEndTypeIndex(element, index) {
//        console.log('In findEndTypeIndex element=',element,' index=',index,' element[0]=',element[0],' entry[6]=',entry[6]);
        return index > 0 && element[eo.end_type] === entry[7];
    }
    function pPush(element) {
        if (element.type === "equationset" && element.input) {
            p.push(element.value);
        }
    }
    function xPush(element) {
        if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
            x.push(element.value)
        }
    }
    function xPull(element) {
        if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
            element.value = x[offset++];
        }
    }

    // scan through catalog
    for (let i = 0; i < catalog.length; i++) { // Skip column headers at zeroth entry
        entry = Object.assign({},catalog[i]); // Make copy so we can modify it without affecting catalog
//        console.log('entry=',entry);

        entry[8] = m_tab.findIndex(findMaterialTypeIndex); // Set matching Material Type index
        entry[9] = et_tab.findIndex(findEndTypeIndex); // Set matching End Type index

//        console.log('In getCatalogEntries 0: entry = ', entry);

        // Update symbol table with catalog entries
        st[o.OD_Free].value = entry[2];
        st[o.Wire_Dia].value = entry[3];
        st[o.L_Free].value = entry[4];
        st[o.Coils_T].value = entry[5];
        st[o.Material_Type].value = entry[8]; // Use Material Type index
        st[o.End_Type].value = entry[9]; // Use End Type index
//        console.log('In getCatalogEntries 0 st=',st);

        // Invoke init function
        p = [];
        st.forEach(pPush);
        x = [];
        st.forEach(xPush);
        x = init(store, p, x);
        offset = 0;
        st.forEach(xPull);
//        console.log('In getCatalogEntries 1 st=',st);

        // Invoke eqnset function
        p = [];
        st.forEach(pPush);
        x = [];
        st.forEach(xPush);
        x = eqnset(p, x);
        offset = 0;
        st.forEach(xPull);
//        console.log('In getCatalogEntries 2 st=',st);

        // Invoke violations & objective value function
        objective_value = getObjectiveValue(st, viol_wt);
//        console.log('In getCatalogEntries 3 objective_value=',objective_value);

        entry[10] = objective_value.toFixed(6); // Set Objective Value
//        console.log('In getCatalogEntries 4: entry = ', entry);

        // get four lowest objective values as candidate entries
        if (cat0 === undefined || entry[10] < cat0[10]) { cat3 = cat2; cat2 = cat1; cat1 = cat0; cat0 = entry; }
        else if (cat1 === undefined || entry[10] < cat1[10]) { cat3 = cat2; cat2 = cat1; cat1 = entry; }
        else if (cat2 === undefined || entry[10] < cat2[10]) { cat3 = cat2; cat2 = entry; }
        else if (cat3 === undefined || entry[10] < cat3[10]) { cat3 = entry; }
//        console.log('In getCatalogEntries 4 cat0=',cat0,' cat1=',cat1,' cat2=',cat2,' cat3=',cat3);
    }
    if (cat0 !== undefined) {
        result.push(convertToResultArray(cat0));
    }
    if (cat1 !== undefined) {
        result.push(convertToResultArray(cat1));
    }
    if (cat2 !== undefined) {
        result.push(convertToResultArray(cat2));
    }
    if (cat3 !== undefined) {
        result.push(convertToResultArray(cat3));
    }
//    console.log('Exiting getCatalogEntries result=',result);
    return result;
}

app.post('/api/v1/select_catalog', (req, res) => {
    console.log('SERVER: In POST /api/v1/select_catalog','req.body=',req.body,'req.body.length=',req.body.length);
    if (req.body === undefined || req.body.length === 0) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
    } else {
//      console.log('SERVER: In POST /api/v1/select_catalog','req.body=',req.body);
      var catalog_name = req.body.catalog_name
      store.dispatch(load(req.body.model));
      var st = req.body.model.symbol_table;
      var viol_wt = req.body.model.system_controls.viol_wt;
      var type = req.body.model.type;

      // Create implied constraints between half and twice
      var cmin_OD_Free = st[o.OD_Free].value/2;
      var cmax_OD_Free = st[o.OD_Free].value*2;
//      console.log('cmin_OD_Free=',cmin_OD_Free,'cmax_OD_Free=',cmax_OD_Free);
      var cmin_Wire_Dia = st[o.Wire_Dia].value/2;
      var cmax_Wire_Dia = st[o.Wire_Dia].value*2;
//      console.log('cmin_Wire_Dia=',cmin_Wire_Dia,'cmax_Wire_Dia=',cmax_Wire_Dia);
      var cmin_L_Free = st[o.L_Free].value/2;
      var cmax_L_Free = st[o.L_Free].value*2;
//      console.log('cmin_L_Free=',cmin_L_Free,'cmax_L_Free=',cmax_L_Free);
      var cmin_Coils_T = st[o.Coils_T].value/2;
      var cmax_Coils_T = st[o.Coils_T].value*2;
//      console.log('cmin_Coils_T=',cmin_Coils_T,'cmax_Coils_T=',cmax_Coils_T);

      // Skip catalog entry if it's less than half the constraint value or greater than twice the constraint value
      var connection = startConnection();
      var stmt = 
        'SELECT c.name as catalog_name, ce.name as catalog_entry_name, ce.OD_Free, ce.Wire_Dia, ce.L_Free, ce.Coils_T, mt.name as material_type_name, st.name as spring_type_name, et.name as end_type_name \
        FROM catalog_entry ce \
        LEFT JOIN catalog c \
        ON ce.catalog_id = c.id \
        LEFT JOIN spring_type st \
        ON ce.spring_type_id = st.id \
        LEFT JOIN material_type mt \
        ON ce.material_type_id = mt.id \
        LEFT JOIN end_type et \
        ON ce.end_type_id = et.id \
        WHERE c.name = \''+catalog_name+'\' AND st.name = \''+type+'\' \
        AND ce.OD_Free BETWEEN '+cmin_OD_Free+' AND '+cmax_OD_Free+' \
        AND ce.Wire_Dia BETWEEN '+cmin_Wire_Dia+' AND '+cmax_Wire_Dia+' \
        AND ce.L_Free BETWEEN '+cmin_L_Free+' AND '+cmax_L_Free+' \
        AND ce.Coils_T BETWEEN '+cmin_Coils_T+' AND '+cmax_Coils_T;
//        WHERE c.name = \''+name+'\' AND st.name = \''+type+'\'';
//      console.log('SERVER: stmt='+stmt);
      connection.query(stmt, function(err, rows) {
//      console.log('SERVER: After SELECT err=', err, 'rows=', rows, 'rows.length=', rows.length);
        if (err) {
          res.status(500).end();
          connection.end();
          console.log('SERVER: 500 - INTERNAL SERVER ERROR');
          throw err;
        } else {
          var catalog = rows.map((row) => {return [row.catalog_name, row.catalog_entry_name, row.OD_Free, row.Wire_Dia, row.L_Free, row.Coils_T, row.material_type_name, row.end_type_name]});
//          console.log('SERVER: After SELECT value=', value);
          var result = getCatalogEntries(catalog, store, st, viol_wt);
          res.status(200).json(result);
//          console.log('SERVER: In POST /api/v1/select_catalog','result=',result);
          connection.end();
          console.log('SERVER: 200 - OK');
        }
      });
    }
});

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//    console.log('process.env.NODE_ENV == production or staging');
    // If it’s not https already, redirect the same url on https.
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        console.log('SERVER: In USE Redirect PATH=',path.join(__dirname, 'client/build', 'index.html'));
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
//        console.log('SERVER: In USE next');
        next();
      }
    })
    // Serve any static files
    app.use(
        express.static(path.join(__dirname, 'client/build'))
    );
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res, next) {
        console.log('SERVER: In GET * PATH=',path.join(__dirname, 'client/build', 'index.html'));
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
} else {
//    console.log('process.env.NODE_ENV != production or staging');
}

const port = process.env.PORT || 5000;
//if (!module.parent) { // If not in a testcase then start listening
    console.log('SERVER: PUBLIC_URL =', process.env.PUBLIC_URL, 'NODE_ENV =', process.env.NODE_ENV, 'starting on port =', port, 'node version =', process.version);
    app.listen(port);
//}

//module.exports = app; // for testing
