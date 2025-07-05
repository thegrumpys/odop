require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const db = require('./db');
var cors = require('cors');
const crypto = require('crypto');
const { hashPassword, comparePassword } = require('./auth');
var lunr = require("lunr");
var lunr_index = require("./lunr_index.json");
var lunr_pages = require("./lunr_pages.json");

const app = express();

// SECURITY SETTINGS
app.set('trust proxy', 1);
app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    maxAge: 86400 * 1000 // 1 day
  }
}));
app.use(function(req, res, next) { // Dump debugging output for each request
  console.log('SERVER: ===========================================================');
  console.log('SERVER: In USE', 'req.originalUrl=', req.originalUrl, 'req.ip=', req.ip, 'req.method=', req.method);
  next();
});
app.use((req, res, next) => { // Check for nasty input
  var found = req.originalUrl.match(/\/\?\d+/); // Example '/?5129='
  if (found) {
    res.status(500).end();
  } else {
    next();
  }
})

// SMTP SETTINGS
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

/**
 * A simple middleware that asserts valid user name and sends 401 responses
 * if the token is not present.  If the token is present its
 * contents are attached to request
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
//  console.log('SERVER: In authenticationRequired', 'authHeader=', authHeader);
//  console.log('SERVER: In authenticationRequired', 'match=', match);
  if (!match) {
    console.log('SERVER: 401 - UNAUTHORIZED');
    return res.status(401).end();
  }
  req.uid = match[1];
//  console.log('SERVER: In authenticationRequired', 'req.uid=', req.uid);
  next();
}

// Token generator
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function generateUserToken() {
  return crypto.randomBytes(15).toString('base64url'); // ~20 characters, URL-safe
}

function renderTemplate(templatePath, replacements = {}) {
  let template = fs.readFileSync(templatePath, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
//    console.log('renderTemplate','key=',key,'value=',value);
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
//  console.log('renderTemplate','template=',template);
  return template;
}

async function sendConfirmationEmail(email, first_name, last_name, token) {
  const frontUrl = process.env.FRONT_URL;
  const confirmUrl = `${process.env.FRONT_URL}/confirm?token=${token}`;
  const html = renderTemplate(path.join(__dirname, 'emails', 'confirm.html'), { email, first_name, last_name, frontUrl, confirmUrl });

  const mailOptions = {
    from: `"Server NoReply" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Confirm your account',
    html,
  };

  await transporter.sendMail(mailOptions);
}

async function sendResetEmail(email, first_name, last_name, token) {
  const frontUrl = process.env.FRONT_URL;
  const resetUrl = `${process.env.FRONT_URL}/change-password?token=${token}&email=${email}`;
  const html = renderTemplate(path.join(__dirname, 'emails', 'reset.html'), { email, first_name, last_name, frontUrl, resetUrl });

  const mailOptions = {
    from: `"Server NoReply" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset your password',
    html,
  };

  await transporter.sendMail(mailOptions);
}

function isValidPassword(password) {
  const lengthOk = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return lengthOk && hasLower && hasUpper && hasNumber;
}

function sendMessage(res, message, severity = 'error', field = null, status = 400) {
//  console.log('sendMessage','message=',message,'severity=',severity,'field=',field,'status=',status);
  const httpStatusCodes = {
    100: "CONTINUE",
    101: "SWITCHING PROTOCOLS",
    200: "OK",
    201: "CREATED",
    204: "NO CONTENT",
    400: "BAD REQUEST",
    401: "UNAUTHORIZED",
    404: "NOT FOUND",
    409: "CONFLICT",
    500: "INTERNAL SERVER ERROR",
  };
  console.log('SERVER: ' + status + ' - ' + httpStatusCodes[status]);
  if (severity === '' && message === '') {
    return res.status(status); // Return just the status
  } else if (severity === '' && message !== '') {
    return res.status(status).json(message); // Return message as data and the status
  } else if (severity !== '') { // message === '' || message !== ''
    const response = {
      error: {
        message,
        severity
      }
    };
    if (field) {
      response.error.field = field;
    }
    return res.status(status).json(response);
  }
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

app.get('/api/v1/db_size', authenticationRequired, async (req, res) => {
  var value;
  var user = req.uid;
//  console.log('SERVER: In GET /api/v1/db_size', 'user=', user);
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
//  console.log('SERVER:', 'stmt=', stmt);
  try {
    const [rows] = await db.execute(stmt);
//    console.log('SERVER: After SELECT', 'rows=', rows);
    if (!rows.length) {
      value = ['Unknown'];
      res.status(200).json(value);
      console.log('SERVER: 500 - INTERNAL SERVER ERROR');
    } else {
      value = rows.map((row) => { return row.db_size_mb });
//      console.log('SERVER: After SELECT DISTINCT', 'value=', value);
      res.status(200).json(value);
      console.log('SERVER: 200 - OK');
    }
  } catch (err) {
    res.status(500).end();
    console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
  }
});

app.get('/api/v1/designtypes', authenticationRequired, async (req, res) => {
  var value;
  var user = req.uid;
//  console.log('SERVER: In GET /api/v1/designtypes', 'user=', user);
  var stmt = 'SELECT DISTINCT type FROM design WHERE (user = \'' + user + '\' OR user IS NULL) ORDER BY type';
//  console.log('SERVER:', 'stmt=', stmt);
  try {
    const [rows] = await db.execute(stmt);
//    console.log('SERVER: After SELECT', 'rows=', rows);
    value = rows.map((row) => { return row.type });
//    console.log('SERVER: After SELECT DISTINCT', 'value=', value);
    res.status(200).json(value);
    console.log('SERVER: 200 - OK');
  } catch (err) {
    res.status(500).end();
    console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
  }
});

app.get('/api/v1/designtypes/:type/designs', authenticationRequired, async (req, res) => {
  var value;
  var user = req.uid;
  var type = req.params['type'];
//  console.log('SERVER: In GET /api/v1/designtypes/' + type + '/designs', 'user=', user);
  var stmt = 'SELECT user, name FROM design WHERE (user = \'' + user + '\' OR user IS NULL) AND type = \'' + type + '\' ORDER BY name ASC, user DESC';
//  console.log('SERVER:', 'stmt=', stmt);
  try {
    const [rows] = await db.execute(stmt);
//    console.log('SERVER: After SELECT', 'rows=', rows);
    value = rows.map((row) => { return { user: row.user, name: row.name } });
//    console.log('SERVER: After SELECT', 'value=', value);
    res.status(200).json(value);
    console.log('SERVER: 200 - OK');
  } catch (err) {
    res.status(500).end();
    console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
  }
});

app.get('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => {
  var type;
  var value;
  var user = req.uid;
  var type = req.params['type'];
  var name = req.params['name'];
//  console.log('SERVER: In GET /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  var stmt = 'SELECT * FROM design WHERE (user = \'' + user + '\' OR user IS NULL) AND type = \'' + type + '\' AND name = \'' + name + '\' ORDER BY user DESC';
//  console.log('SERVER:', 'stmt=', stmt);
  try {
    const [rows] = await db.execute(stmt);
//    console.log('SERVER: After SELECT', 'rows=', rows);
    if (!rows.length) {
      res.status(404).end();
      console.log('SERVER: 404 - NOT FOUND');
    } else {
//      console.log('SERVER: After SELECT', 'rows[0]=', rows[0]);
      type = rows[0].type; // Get type from the JSON blob
//      console.log('SERVER: After SELECT', 'user=', user, 'name=', name, 'type=', type);
      value = JSON.parse(rows[0].value); // Get value from the JSON blob
      value.type = type; // Insert type into blob
//      console.log('SERVER: After SELECT', 'value=', value);
      res.status(200).json(value);
      console.log('SERVER: 200 - OK');
    }
  } catch (err) {
    res.status(500).end();
    console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
  }
});

app.post('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => { // Create New
  var value;
  var user = req.uid;
  var type = req.body.type;
  var name = req.params['name'];
//  console.log('SERVER: In POST /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  if (req.uid === "null" || req.body === undefined || req.body.length === 0 || req.body.type === undefined || req.body.type !== req.params['type']) {
    res.status(400).end();
    console.log('SERVER: 400 - BAD REQUEST');
  } else {
    delete req.body.type; // Do not save the type in the blob
    value = JSON.stringify(req.body); // Convert blob to string
    var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//    console.log('SERVER:', 'stmt=', stmt);
    try {
      const [rows] = await db.execute(stmt);
//      console.log('SERVER: After SELECT', 'rows=', rows);
      if (rows[0].count > 0) {
        res.status(400).end();
        console.log('SERVER: 400 - BAD REQUEST');
      } else {
//        console.log('SERVER: In POST /api/v1/designs/' + name, 'type=', type, 'value=', value);
        value = value.replace(/[']/ig, "''") // replace one single quote with an two single quotes throughout
          .replace(/\\n/g, "\\\\n")
          .replace(/\\'/g, "\\\\'")
          .replace(/\\"/g, '\\\\"')
          .replace(/\\&/g, "\\\\&")
          .replace(/\\r/g, "\\\\r")
          .replace(/\\t/g, "\\\\t")
          .replace(/\\b/g, "\\\\b")
          .replace(/\\f/g, "\\\\f");
        var stmt = 'INSERT INTO design (user, type, name, value) VALUES (\'' + user + '\',\'' + type + '\',\'' + name + '\',\'' + value + '\')';
//        console.log('SERVER:', 'stmt=', stmt);
        try {
          const [rows] = await db.execute(stmt);
//          console.log('SERVER: After INSERT', 'rows=', rows);
          value = {};
//          console.log('SERVER: After INSERT', 'value=', value);
          res.status(200).json(value);
          console.log('SERVER: 200 - OK');
        } catch (err) {
          res.status(500).end();
          console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
        }
      }
    } catch (err) {
      res.status(500).end();
      console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
    }
  }
});

app.put('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => { // Update Existing
  var value;
  var user = req.uid;
  var type = req.body.type;
  var name = req.params['name'];
//  console.log('SERVER: In PUT /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  if (req.uid === "null" || req.body === undefined || req.body.length === 0 || req.body.type === undefined || req.body.type !== req.params['type']) {
    res.status(400).end();
    console.log('SERVER: 400 - BAD REQUEST');
  } else {
    delete req.body.type; // Do not save the type in the blob
    value = JSON.stringify(req.body); // Convert blob to string
    var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//    console.log('SERVER:', 'stmt=', stmt);
    try {
      const [rows] = await db.execute(stmt);
//      console.log('SERVER: After SELECT', 'rows=', rows);
//      console.log('SERVER: In PUT /api/v1/designs/' + name, 'type=', type, 'value=', value);
      if (rows[0].count === 0) {
        res.status(404).end();
        console.log('SERVER: 404 - NOT FOUND');
      } else {
        value = value.replace(/[']/ig, "''") // replace one single quote with an two single quotes throughout
          .replace(/\\n/g, "\\\\n")
          .replace(/\\'/g, "\\\\'")
          .replace(/\\"/g, '\\\\"')
          .replace(/\\&/g, "\\\\&")
          .replace(/\\r/g, "\\\\r")
          .replace(/\\t/g, "\\\\t")
          .replace(/\\b/g, "\\\\b")
          .replace(/\\f/g, "\\\\f");
        var stmt = 'UPDATE design SET value = \'' + value + '\' WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//        console.log('SERVER:', 'stmt=', stmt);
        try {
          const [rows] = await db.execute(stmt);
//          console.log('SERVER: After UPDATE', 'rows=', rows);
          value = {};
//          console.log('SERVER: After UPDATE', 'value=', value);
          res.status(200).json(value);
          console.log('SERVER: 200 - OK');
        } catch (err) {
          res.status(500).end();
          console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
        }
      }
    } catch (err) {
      res.status(500).end();
      console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
    }
  }
});

app.delete('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => {
  var value;
  var user = req.uid;
  var type = req.params['type'];
  var name = req.params['name'];
//  console.log('SERVER: In DELETE /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  if (req.uid === "null") {
    res.status(400).end();
    console.log('SERVER: 400 - BAD REQUEST');
  } else {
    var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//    console.log('SERVER:', 'stmt=', stmt);
    try {
      const [rows] = await db.execute(stmt);
//      console.log('SERVER: After SELECT', 'rows=', rows);
      if (rows[0].count === 0) {
        res.status(404).end();
        console.log('SERVER: 404 - NOT FOUND');
      } else {
        var stmt = 'DELETE FROM design WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//        console.log('SERVER:', 'stmt=', stmt);
        try {
          const [rows] = await db.execute(stmt);
//          console.log('SERVER: After DELETE', 'rows=', rows);
          value = {};
//          console.log('SERVER: After DELETE', 'value=', value);
          res.status(200).json(value);
          console.log('SERVER: 200 - OK');
        } catch (err) {
          res.status(500).end();
          console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
        }
      }
    } catch (err) {
      res.status(500).end();
      console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
    }
  }
});

// usage_log
app.post('/api/v1/usage_log', async (req, res) => {
  var ip_address;
  var note;
  ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  note = JSON.stringify(req.body); // Convert blob to string
//  console.log('SERVER: In POST /api/v1/usage_log', 'ip_address=' + ip_address + ' note=', note);
  note = note.replace(/[']/ig, "''"); // replace one single quote with an two single quotes throughout
  var stmt = 'INSERT INTO usage_log (ip_address, note) VALUES (\'' + ip_address + '\',\'' + note + '\')';
//  console.log('SERVER:', 'stmt=', stmt);
  try {
    const [rows] = await db.execute(stmt);
//    console.log('SERVER: After INSERT', 'rows=', rows);
    var value = {};
//    console.log('SERVER: After INSERT', 'value=', value);
    res.status(200).json(value);
    console.log('SERVER: 200 - OK');
  } catch (err) {
    res.status(500).end();
    console.log('SERVER: 500 - INTERNAL SERVER ERROR', 'err=', err);
  }
});

// SEARCH
const SENTENCE_SEPARATOR = ' <> ';

var searchIndex = lunr.Index.load(lunr_index);

app.get('/api/v1/search', (req, res) => {
//  console.log('SERVER:', 'req=', req);
  var terms = req.query.terms;
  const results = searchSite(terms);
//  console.log('SERVER:', 'results=', results);
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
//  console.log('createSentenceSearchResult', 'pageMatch=', pageMatch);
//  console.log('createSentenceSearchResult', 'pageMatch.href=', pageMatch.href);
  let sentenceData = [];
  Object.keys(pageMatch.matchData.metadata).forEach(function(term) {
//    console.log('createSentenceSearchResult', 'term=', term);
    Object.keys(pageMatch.matchData.metadata[term]).forEach(function(fieldName) {
      if (fieldName === 'sentence_text') { // Only highlight content
//        console.log('createSentenceSearchResult', 'fieldName=', fieldName);
        let hit = pageMatch[fieldName];
//        console.log('createSentenceSearchResult', 'hit=', hit);
        pageMatch.matchData.metadata[term][fieldName].position.forEach((position) => {
//          console.log('createSentenceSearchResult', 'position=', position);
          let lio = hit.lastIndexOf(SENTENCE_SEPARATOR, position[0]) + SENTENCE_SEPARATOR.length;
          if (sentenceData[lio] === undefined) {
            sentenceData[lio] = [];
          }
          let position_clone = Object.assign({}, position); // clone it
          position_clone[0] = position_clone[0] - lio;
//          console.log('createSentenceSearchResult', 'lio=', lio, 'position=', position);
          sentenceData[lio].push(position_clone);
          sentenceData[lio].sort((a, b) => a[0] - b[0]); // Put in position order
        });
      }
    });
  });
//  console.log('createSentenceSearchResult', 'sentenceData=', sentenceData);
  let searchResultText = "";
  let style_color = 'style="color:' + getColorForSearchResult(pageMatch.score) + '"'
  let hit = pageMatch.sentence_text;
  Object.keys(sentenceData).forEach(function(lio) {
    let io = hit.indexOf(SENTENCE_SEPARATOR, lio);
//    console.log('createSentenceSearchResult', 'lio=', lio, 'io=', io);
    let offset = 0;
    let sentence = hit.slice(lio, io);
    sentenceData[lio].forEach((position) => {
//      console.log('createSentenceSearchResult', 'offset=', offset, 'position=', position);
      let prefix = sentence.slice(0, offset + position[0]);
      let strong_prefix = `<strong ${style_color}>`;
      let text = sentence.substr(offset + position[0], position[1]);
      let strong_suffix = '</strong>';
      let suffix = sentence.slice(offset + position[0] + position[1]);
//      console.log('createSentenceSearchResult', 'prefix=', prefix, 'strong_prefix=', strong_prefix, 'text=', text, ',strong_suffix=', strong_suffix, 'suffix=', suffix);
      sentence = prefix + strong_prefix + text + strong_suffix + suffix;
      offset += strong_prefix.length + strong_suffix.length;
    });
    let ellipsis = ' ... ';
    searchResultText += sentence + ellipsis;
  });
//  console.log('createSentenceSearchResult', 'searchResultText=', searchResultText);
  return searchResultText;
}

function createHighlightSearchResult(pageMatch) {
//  console.log('createHighlightSearchResult', 'result=', result, 'pageMatch=', pageMatch);
  let searchResultHighlights = [];
  Object.keys(pageMatch.matchData.metadata).forEach(function(term) {
//    console.log('createHighlightSearchResult', 'term=', term);
    Object.keys(pageMatch.matchData.metadata[term]).forEach(function(fieldName) {
//      console.log('createHighlightSearchResult', 'fieldName=', fieldName);
      if (fieldName === 'highlight_text') {
        pageMatch.matchData.metadata[term][fieldName].position.forEach((position) => {
//          console.log('createHighlightSearchResult', 'position=', position);
          searchResultHighlights.push(position);
        });
      }
    });
  });
//  console.log('createHighlightSearchResult', 'searchResultHighlights=', searchResultHighlights);
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

// REGISTER
app.post('/api/v1/register', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
//  console.log('/register','email=',email,'password=',password,'first_name=',first_name,'last_name=',last_name);

  if (!isValidPassword(password)) {
    sendMessage(res, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.', 'error', null, 400);
    return;
  }

  const confirmationToken = generateToken();
  const local = new Date(Date.now() + 60 * 60 * 1000); // UTC + 1 hour
  const expiresAt = new Date(local.getTime() + local.getTimezoneOffset() * 60000); // Fudge
//  console.log('/register','expiresAt=',expiresAt);

  try {
    // Does email already exists
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
//    console.log('rows=',rows);
    if (rows.length) {
      sendMessage(res, 'Duplicate email', 'error', null, 409);
      return;
    }

    // Create new 'inactive' user with email and password, and confirmation token
    const hashed = await hashPassword(password);
    await db.execute('INSERT INTO user (email, password, first_name, last_name, role, token, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [email, hashed, first_name, last_name, 'user', null, 'inactive']);
    await db.execute('INSERT INTO token (token, email, type, expires_at) VALUES (?, ?, ?, ?)', [confirmationToken, email, 'confirm', expiresAt]);

    // Send confirmation email
    try {
      await sendConfirmationEmail(email, first_name, last_name, confirmationToken);
      sendMessage(res, 'Registration confirmation email sent.', 'info', null, 200);
    } catch (err) {
      sendMessage(res, err.response, 'error', null, 500);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// CONFIRM
app.get('/api/v1/confirm', async (req, res) => {
  const { token } = req.query;
//  console.log('token=',token);
  try {
    // Does a matching confirmation token exist
    const [rows] = await db.execute('SELECT email FROM token WHERE token = ? AND type = ? AND expires_at > NOW()', [token, 'confirm']);
//    console.log('/api/v1/confirm','rows=',rows,'rows.length=',rows.length,'!rows.length=',!rows.length);
    if (!rows.length) {
      sendMessage(res, 'Token is invalid or has expired', 'error', null, 401);
      return;
    }

    // If token is null update with a new one, change the user startus to 'active', and delete the token
    const email = rows[0].email;
    const userToken = generateUserToken();
    await db.execute('UPDATE user SET token = ? WHERE email = ? AND token IS NULL', [userToken, email]);
    await db.execute('UPDATE user SET status = ? WHERE email = ?', ['active', email]);
    await db.execute('DELETE FROM token WHERE token = ?', [token]);
    sendMessage(res, 'Registration confirmed.', 'info', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// HAS PASSWORD
app.get('/api/v1/has-password', async (req, res) => {
  const { email } = req.query;
//  console.log('/api/v1/has-password','email=',email);
  try {
    // Does user exist?
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (!rows.length) {
      sendMessage(res, 'Unknown email or password, or inactive account', 'error', null, 401);
      return;
    }
    const hasPassword = rows.length > 0 && rows[0].password!== null;
//    console.log('/api/v1/has-password','hasPassword=',hasPassword);
    sendMessage(res, { hasPassword }, '', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// LOGIN
app.post('/api/v1/login', async (req, res) => {
  const { email, password } = req.body;
//  console.log('/api/v1/login','email=',email,'password=',password);
  try {
    // Does user exist?
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
//    console.log('/api/v1/login','rows=',rows);
    const user = rows[0];
    const match = user && await comparePassword(password, user.password);
//    console.log('/api/v1/login','match=',match);
    if (!match || user.status !== 'active') {
      return sendMessage(res, 'Unknown email or password, or inactive account', 'error', null, 401);
    }

    await db.query('UPDATE user SET last_login_at = NOW() WHERE id = ?', [user.id]);
    req.session.user = { email: user.email, token: user.token, first_name: user.first_name, last_name: user.last_name, isAuthenticated: true, isAdmin: user.role === 'admin' };
    sendMessage(res, 'Successful login.', 'info', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// CHECK SESSION
app.get('/api/v1/me', (req, res) => {
  if (req.session.user) {
//    console.log('/me','req.session.user=',req.session.user);
    res.json({
      authState: {
        email: req.session.user.email,
        token: req.session.user.token,
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
        isAuthenticated: true,
        isAdmin: req.session.user.isAdmin
      }
    });
  } else {
//    console.log('/me','no req.session.user');
    res.json({
      authState: {
        isAuthenticated: false,
        isAdmin: false
      }
    });
  }
  sendMessage(res, '', '', null, 200);
});

// LOGOUT
app.post('/api/v1/logout', (req, res) => {
//  console.log('/logout');
  req.session.destroy(() => res.sendStatus(200));
  console.log('SERVER: 200 - OK');
});

// PASSWORD RESET REQUEST
app.post('/api/v1/reset-password', async (req, res) => {
  const { email } = req.body;
//  console.log('/api/v1/reset-password','email=',email);

  try {
    // Does user exist?
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (!rows.length) {
      sendMessage(res, 'Unknown email or password, or inactive account', 'error', null, 401);
      return;
    }

    const user = rows[0];
//    console.log('/api/v1/reset-password','user=',user);
    const resetToken = generateToken();
    const local = new Date(Date.now() + 60 * 60 * 1000); // UTC + 1 hour
    const expiresAt = new Date(local.getTime() + local.getTimezoneOffset() * 60000); // Fudge
//  console.log('/api/v1/reset-password','expiresAt=',expiresAt);

    // Create a reset token
    await db.execute('INSERT INTO token (token, email, type, expires_at) VALUES (?, ?, ?, ?)', [resetToken, email, 'reset', expiresAt]);

    // Send reset email
    try {
      await sendResetEmail(email, user.first_name, user.last_name, resetToken);
      sendMessage(res, 'Reset password email sent.', 'info', null, 200);
    } catch (err) {
      sendMessage(res, err.response, 'error', null, 500);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// CHANGE PASSWORD
app.patch('/api/v1/change-password', async (req, res) => {
  const { token, email, password } = req.body;
//  console.log('/api/v1/change-password','token=',token,'email=',email,'password=',password);

  try {
    // Does a matching reset token exist
    const [rows] = await db.execute('SELECT email FROM token WHERE email = ? AND token = ? AND type = ? AND expires_at > NOW()', [email, token, 'reset']);
    if (!rows.length) {
      sendMessage(res, 'Token is invalid or has expired', 'error', null, 401);
      return;
    }

    if (!isValidPassword(password)) {
      sendMessage(res, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.', 'error', null, 400);
      return;
    }

    // Update the password
    const db_email = rows[0].email;
    const hashed = await hashPassword(password);
    await db.execute('UPDATE user SET password = ? WHERE email = ?', [hashed, db_email]);
    await db.execute('DELETE FROM token WHERE token = ?', [token]);
    sendMessage(res, 'Password changed.', 'info', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

app.delete('/api/v1/cleanup-tokens', async (req, res) => {
  try {
    await db.query('DELETE FROM token WHERE expires_at < NOW()');
    sendMessage(res, 'Expired tokens cleaned up successfully', 'info', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//  console.log('process.env.NODE_ENV == production or staging', 'process.env.NODE_ENV=', process.env.NODE_ENV);
  // If it’s not https already, redirect the same url on https.
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
//      console.log('SERVER: In USE Redirect PATH=', path.join(__dirname, 'client/build', 'index.html'));
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
//      console.log('SERVER: In USE next');
      next();
    }
  })
  // Serve any static files
  app.use(
    express.static(path.join(__dirname, 'client/build'))
  );
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res, next) {
//    console.log('SERVER: In GET * PATH=', path.join(__dirname, 'client/build', 'index.html'));
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
//  console.log('process.env.NODE_ENV != production or staging', 'process.env.NODE_ENV=', process.env.NODE_ENV);
}

const port = process.env.PORT || 5000;
if (!module.parent) { // If not in a testcase then start listening
  app.listen(port, () => {
    console.log('SERVER:', 'PUBLIC_URL=', process.env.PUBLIC_URL, 'NODE_ENV=', process.env.NODE_ENV, 'starting on port=', port, 'node version=', process.version);
  });
}

module.exports = app; // for testing
