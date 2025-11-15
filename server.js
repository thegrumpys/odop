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

// --- DB status logging ---
if (process.env.ENABLE_DB === 'true') {
  console.log('✅ JAWSDB connection ENABLED');
} else {
  console.warn('⚠️  JAWSDB connections are DISABLED (ENABLE_DB=false)');
}

app.use(session({
  name: 'odop_session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 1 day
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
async function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
//  console.log('SERVER: In authenticationRequired', 'authHeader=', authHeader);
//  console.log('SERVER: In authenticationRequired', 'match=', match);
  if (!match) {
    sendMessage(res,'','',null,401);
    return;
  }
  req.uid = match[1];
//  console.log('SERVER: In authenticationRequired', 'req.uid=', req.uid);
  if (req.uid !== 'null') { // 'null' string, not null value!
    const [rows] = await db.execute('SELECT role FROM user WHERE status = \'active\' AND token = ?', [req.uid]);
    if (!rows.length || (rows[0].role !== 'user' && rows[0].role !== 'admin')) {
      sendMessage(res, '', '', null, 401);
      return;
    }
  }
  next();
}

async function adminRequired(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
//  console.log('SERVER: In authenticationRequired', 'authHeader=', authHeader);
//  console.log('SERVER: In authenticationRequired', 'match=', match);
    if (!match) {
      sendMessage(res,'','',null,401);
      return;
    }
    req.uid = match[1];
    const [rows] = await db.execute('SELECT role FROM user WHERE status = \'active\' AND token = ?', [req.uid]);
    if (!rows.length || rows[0].role !== 'admin') {
      sendMessage(res, '', '', null, 401);
      return;
    }
    next();
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
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
  const confirmUrl = `${process.env.FRONT_URL}/confirm?token=${token}&email=${email}`;
  const html = renderTemplate(path.join(__dirname, 'emails', 'confirm.html'), { email, first_name, last_name, frontUrl, confirmUrl });

  const mailOptions = {
    from: `"Server NoReply" <${process.env.SMTP_USER}>`,
    to: email,
    bcc: `"Server NoReply" <${process.env.SMTP_USER}>`,
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
    bcc: `"Server NoReply" <${process.env.SMTP_USER}>`,
    subject: 'Reset your password',
    html,
  };

  await transporter.sendMail(mailOptions);
}

async function resendEmail(req, res) {
  const { email } = req.body;
  const type = req.query.type;

  if (!isValidEmail(email)) {
    sendMessage(res, 'Unknown email or password, or inactive account.', 'error', 'email', 400);
    return;
  }

  try {
    if (type === 'confirm') {
      const [rows] = await db.execute('SELECT first_name, last_name FROM user WHERE email = ? AND status = ?', [email, 'inactive']);
      if (!rows.length) {
        sendMessage(res, 'No outstanding registration exists or has expired.', 'error', null, 401);
        return;
      }
      await db.execute('DELETE FROM token WHERE email = ? AND type = ?', [email, 'confirm']);
      const token = generateToken();
      const local = new Date(Date.now() + 24 * 60 * 60 * 1000); // UTC + 24 hour
      const expiresAt = new Date(local.getTime() + local.getTimezoneOffset() * 60000);
      await db.execute('INSERT INTO token (token, email, type, expires_at) VALUES (?, ?, ?, ?)', [token, email, 'confirm', expiresAt]);
      const { first_name, last_name } = rows[0];
      await sendConfirmationEmail(email, first_name, last_name, token);
      sendMessage(res, 'Registration confirmation email sent.', 'info', null, 200);
    } else if (type === 'reset') {
      const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
      if (!rows.length) {
        sendMessage(res, 'Unknown email or password, or inactive account.', 'error', null, 401);
        return;
      }
      const user = rows[0];
      const token = generateToken();
      const local = new Date(Date.now() + 24 * 60 * 60 * 1000); // UTC + 24 hour
      const expiresAt = new Date(local.getTime() + local.getTimezoneOffset() * 60000);
      await db.execute('INSERT INTO token (token, email, type, expires_at) VALUES (?, ?, ?, ?)', [token, email, 'reset', expiresAt]);
      await sendResetEmail(email, user.first_name, user.last_name, token);
      sendMessage(res, 'Reset password email sent.', 'info', null, 200);
    } else {
      sendMessage(res, 'Invalid resend type.', 'error', 'type', 400);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    return res.status(status).end(); // Return just the status
  } else if (severity === '' && message !== '') {
    return res.status(status).json(message).end(); // Return message as data and the status
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
    return res.status(status).json(response).end();
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

//==================================================================================================
// db_size
app.get('/api/v1/db_size', adminRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
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
      sendMessage(res, value, '', null, 200);
    } else {
      value = rows.map((row) => { return row.db_size_mb });
//      console.log('SERVER: After SELECT DISTINCT', 'value=', value);
      sendMessage(res, value, '', null, 200);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// designtypes
app.get('/api/v1/designtypes', authenticationRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
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
    sendMessage(res, value, '', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// designtypes/:type/designs
app.get('/api/v1/designtypes/:type/designs', authenticationRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
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
    sendMessage(res, value, '', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// designtypes/:type/designs/:name
app.get('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  var type;
  var value;
  var user = req.uid;
  var type = req.params['type'];
  var name = req.params['name'];
  name = name.replace(/[']/ig, "''"); // replace one single quote with an two single quotes throughout
//  console.log('SERVER: In GET /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  var stmt = 'SELECT * FROM design WHERE (user = \'' + user + '\' OR user IS NULL) AND type = \'' + type + '\' AND name = \'' + name + '\' ORDER BY user DESC';
//  console.log('SERVER:', 'stmt=', stmt);
  try {
    const [rows] = await db.execute(stmt);
//    console.log('SERVER: After SELECT', 'rows=', rows);
    if (!rows.length) {
      sendMessage(res, '', '', null, 404);
    } else {
//      console.log('SERVER: After SELECT', 'rows[0]=', rows[0]);
      type = rows[0].type; // Get type from the JSON blob
//      console.log('SERVER: After SELECT', 'user=', user, 'name=', name, 'type=', type);
      value = JSON.parse(rows[0].value); // Get value from the JSON blob
      value.type = type; // Insert type into blob
//      console.log('SERVER: After SELECT', 'value=', value);
      sendMessage(res, value, '', null, 200);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// designtypes/:type/designs/:name - create new
app.post('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => { // Create New
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  var value;
  var user = req.uid;
  var type = req.body.type;
  var name = req.params['name'];
  name = name.replace(/[']/ig, "''"); // replace one single quote with an two single quotes throughout
//  console.log('SERVER: In POST /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  if (req.uid === "null" || req.body === undefined || req.body.length === 0 || req.body.type === undefined || req.body.type !== req.params['type']) {
    sendMessage(res, '', '', null, 400);
  } else {
    delete req.body.type; // Do not save the type in the blob
    value = JSON.stringify(req.body); // Convert blob to string
    var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//    console.log('SERVER:', 'stmt=', stmt);
    try {
      const [rows] = await db.execute(stmt);
//      console.log('SERVER: After SELECT', 'rows=', rows);
      if (rows[0].count > 0) {
        sendMessage(res, '', '', null, 400);
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
          sendMessage(res, value, '', null, 200);
        } catch (err) {
          sendMessage(res, err, 'error', null, 500);
        }
      }
    } catch (err) {
      sendMessage(res, err, 'error', null, 500);
    }
  }
});

//==================================================================================================
// designtypes/:type/designs/:name - update existing
app.put('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => { // Update Existing
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  var value;
  var user = req.uid;
  var type = req.body.type;
  var name = req.params['name'];
  name = name.replace(/[']/ig, "''"); // replace one single quote with an two single quotes throughout
//  console.log('SERVER: In PUT /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  if (req.uid === "null" || req.body === undefined || req.body.length === 0 || req.body.type === undefined || req.body.type !== req.params['type']) {
    sendMessage(res, '', '', null, 400);
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
        sendMessage(res, '', '', null, 404);
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
          sendMessage(res, value, '', null, 200);
        } catch (err) {
          sendMessage(res, err, 'error', null, 500);
        }
      }
    } catch (err) {
      sendMessage(res, err, 'error', null, 500);
    }
  }
});

//==================================================================================================
// designtypes/:type/designs/:name
app.delete('/api/v1/designtypes/:type/designs/:name', authenticationRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  var value;
  var user = req.uid;
  var type = req.params['type'];
  var name = req.params['name'];
  name = name.replace(/[']/ig, "''"); // replace one single quote with an two single quotes throughout
//  console.log('SERVER: In DELETE /api/v1/designtypes/' + type + '/designs/' + name, 'user=', user);
  if (req.uid === "null") {
    sendMessage(res, '', '', null, 400);
  } else {
    var stmt = 'SELECT COUNT(*) AS count FROM design WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//    console.log('SERVER:', 'stmt=', stmt);
    try {
      const [rows] = await db.execute(stmt);
//      console.log('SERVER: After SELECT', 'rows=', rows);
      if (rows[0].count === 0) {
        sendMessage(res, '', '', null, 404);
      } else {
        var stmt = 'DELETE FROM design WHERE user = \'' + user + '\' AND type = \'' + type + '\' AND name = \'' + name + '\'';
//        console.log('SERVER:', 'stmt=', stmt);
        try {
          const [rows] = await db.execute(stmt);
//          console.log('SERVER: After DELETE', 'rows=', rows);
          value = {};
//          console.log('SERVER: After DELETE', 'value=', value);
          sendMessage(res, value, '', null, 200);
        } catch (err) {
          res.status(500).end();
          sendMessage(res, err, 'error', null, 500);
        }
      }
    } catch (err) {
      sendMessage(res, err, 'error', null, 500);
    }
  }
});

//==================================================================================================
// usage_log
app.post('/api/v1/usage_log', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
//  console.log('@@@/api/v1/usage_log@@@',JSON.stringify(req.session));
  var ip_address;
  var note;
  ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//  console.log('SERVER: In POST /api/v1/usage_log', 'ip_address=' + ip_address + ' note=', note);
  note = JSON.stringify(req.body); // Convert blob to string
  note = note.replace(/[']/ig, "''"); // replace one single quote with an two single quotes throughout
  var action = req.body.action !== undefined ? req.body.action.replace(/[']/ig, "''") : '';
  var event_value = req.body.note.event_value !== undefined ? req.body.note.event_value : 0;
  var event_datetime = req.body.note.event_datetime !== undefined ? 'STR_TO_DATE(\'' + req.body.note.event_datetime + '\',"%Y-%m-%dT%H:%i:%s.%fZ")' : '\'\'';
  var event_label = req.body.note.event_label !== undefined ? req.body.note.event_label.replace(/[']/ig, "''") : '';
//  console.log('action=', action, 'event_value=', event_value, 'event_datetime=', event_datetime, 'event_label=', event_label)
  var stmt = 'INSERT INTO usage_log (ip_address, note, action, event_value, event_datetime, event_label) VALUES (\'' + ip_address + '\',\'' + note + '\',\'' + action + '\',' + event_value + ',' + event_datetime + ',\'' + event_label + '\')';
//  console.log('SERVER:', 'stmt=', stmt);
  try {
    const [rows] = await db.execute(stmt);
//    console.log('SERVER: After INSERT', 'rows=', rows);
    var value = {};
//    console.log('SERVER: After INSERT', 'value=', value);
    sendMessage(res, value, '', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// SEARCH
const SENTENCE_SEPARATOR = ' <> ';

var searchIndex = lunr.Index.load(lunr_index);

app.get('/api/v1/search', (req, res) => {
//  console.log('SERVER:', 'req=', req);
  var terms = req.query.terms;
  const results = searchSite(terms);
//  console.log('SERVER:', 'results=', results);
  sendMessage(res,results,'',null,200);
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

//==================================================================================================
// REGISTER
app.post('/api/v1/register', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { email, password, first_name, last_name } = req.body;
//  console.log('/register','email=',email,'password=',password,'first_name=',first_name,'last_name=',last_name);

  if (!isValidEmail(email)) {
    sendMessage(res, 'Invalid email address format.', 'error', 'email', 400);
    return;
  }

  if (!isValidPassword(password)) {
    sendMessage(res, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.', 'error', 'password', 400);
    return;
  }

  const confirmationToken = generateToken();
  const local = new Date(Date.now() + 24 * 60 * 60 * 1000); // UTC + 24 hour
  const expiresAt = new Date(local.getTime() + local.getTimezoneOffset() * 60000); // Fudge
//  console.log('/register','expiresAt=',expiresAt);

  try {
    // Does email already exists
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
//    console.log('rows=',rows);
    if (rows.length) {
      sendMessage(res, 'Email already exists.', 'error', null, 409);
      return;
    }

    // Create new 'inactive' user with email and password, and confirmation token
    const hashed = await hashPassword(password);
    const userToken = generateUserToken();
    await db.execute('INSERT INTO user (email, password, first_name, last_name, role, token, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [email, hashed, first_name, last_name, 'user', userToken, 'inactive']);
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

//==================================================================================================
// CONFIRM
app.get('/api/v1/confirm', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { token } = req.query;
//  console.log('/api/v1/confirm','token=',token);
  try {
    // Does a matching confirmation token exist
    const [rows] = await db.execute('SELECT email FROM token WHERE token = ? AND type = ? AND expires_at > NOW()', [token, 'confirm']);
//    console.log('/api/v1/confirm','rows=',rows,'rows.length=',rows.length,'!rows.length=',!rows.length);
    if (!rows.length) {
      sendMessage(res, 'No outstanding registration exists or has expired.', 'error', null, 401);
      return;
    }

    // If token is null update with a new one, change the user startus to 'active', and delete the token
    const email = rows[0].email;
    await db.execute('UPDATE user SET status = ? WHERE email = ?', ['active', email]);
    await db.execute('DELETE FROM token WHERE token = ?', [token]);
    sendMessage(res, 'Registration confirmed.', 'info', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// HAS PASSWORD
app.get('/api/v1/has-password', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { email } = req.query;
//  console.log('/api/v1/has-password','email=',email);
  try {
    // Does user exist?
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (!rows.length) {
      sendMessage(res, 'Unknown email or password, or inactive account.', 'error', null, 401);
      return;
    }
    const hasPassword = rows.length > 0 && rows[0].password !== null;
//    console.log('/api/v1/has-password','hasPassword=',hasPassword);
    sendMessage(res, { hasPassword }, '', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// LOGIN
app.post('/api/v1/login', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { email, password } = req.body;
//  console.log('/api/v1/login','email=',email,'password=',password);

  if (!isValidEmail(email)) {
    sendMessage(res, 'Invalid email address format.', 'error', 'email', 400);
    return;
  }

  if (!isValidPassword(password)) {
    sendMessage(res, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.', 'error', 'password', 400);
    return;
  }
  try {
    // Does user exist?
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ? AND status = ?', [email, 'active']);
//    console.log('/api/v1/login','rows=',rows);
    const user = rows[0];
    const match = user && await comparePassword(password, user.password);
//    console.log('/api/v1/login','match=',match);
    if (!match) {
      sendMessage(res, 'Unknown email or password, or inactive account.', 'error', null, 401);
      return;
    }

    await db.query('UPDATE user SET last_login_at = NOW() WHERE id = ?', [user.id]);
    req.session.user = { email: user.email, token: user.token, first_name: user.first_name, last_name: user.last_name, isAuthenticated: true, isAdmin: user.role === 'admin' };
    sendMessage(res, 'Successful login.', 'info', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// CHECK SESSION
app.get('/api/v1/me', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  if (req.session.user) {
//    console.log('/me','req.session.user=',req.session.user);
    sendMessage(res, {
      authState: {
        email: req.session.user.email,
        token: req.session.user.token,
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
        isAuthenticated: true,
        isAdmin: req.session.user.isAdmin
      }
    }, '', null, 200);
  } else {
//    console.log('/me','no req.session.user');
    sendMessage(res, {
      authState: {
        isAuthenticated: false,
        isAdmin: false
      }
    }, '', null, 200);
  }
});

//==================================================================================================
// LOGOUT
app.post('/api/v1/logout', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
//  console.log('/logout');
  req.session.destroy(() => {
    res.clearCookie("odop_session");
    sendMessage(res,'','',null,200);
  });
});

//==================================================================================================
// PASSWORD RESET REQUEST
app.post('/api/v1/reset-password', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { email } = req.body;
//  console.log('/api/v1/reset-password','email=',email);

  if (!isValidEmail(email)) {
    sendMessage(res, 'Invalid email address format.', 'error', 'email', 400);
    return;
  }

  try {
    // Does user exist?
    const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (!rows.length) {
      sendMessage(res, 'Unknown email or password, or inactive account.', 'error', null, 401);
      return;
    }

    const user = rows[0];
//    console.log('/api/v1/reset-password','user=',user);
    const resetToken = generateToken();
    const local = new Date(Date.now() + 24 * 60 * 60 * 1000); // UTC + 24 hour
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

//==================================================================================================
// HAS-RESET-TOKEN
app.get('/api/v1/has-reset-token', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { token } = req.query;
//  console.log('/api/v1/has-reset-token',token=',token);
  try {
    // Does a matching reset token exist
    const [rows] = await db.execute('SELECT email FROM token WHERE token = ? AND type = ? AND expires_at > NOW()', [token, 'reset']);
//    console.log('/api/v1/has-reset-token','rows=',rows,'rows.length=',rows.length,'!rows.length=',!rows.length);
    if (!rows.length) {
      sendMessage(res, 'No outstanding password change exists or has expired.', 'error', null, 401);
      return;
    }

    sendMessage(res, {}, '', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
// CHANGE PASSWORD
app.patch('/api/v1/change-password', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { token, email, password } = req.body;
//  console.log('/api/v1/change-password','token=',token,'email=',email,'password=',password);

  try {
    // Does a matching reset token exist
    const [rows] = await db.execute('SELECT email FROM token WHERE email = ? AND token = ? AND type = ? AND expires_at > NOW()', [email, token, 'reset']);
    if (!rows.length) {
      sendMessage(res, 'No outstanding password change exists or has expired.', 'error', null, 401);
      return;
    }

    if (!isValidPassword(password)) {
      sendMessage(res, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.', 'error', null, 400);
      return;
    }

    // Update the password
    const db_email = rows[0].email;
    const hashed = await hashPassword(password);
    await db.execute('UPDATE user SET status = ? WHERE email = ? AND password IS NULL', ['active', email]);
    await db.execute('UPDATE user SET password = ? WHERE email = ?', [hashed, db_email]);
    await db.execute('DELETE FROM token WHERE token = ?', [token]);
    sendMessage(res, 'Password changed successfully.', 'info', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// ===========================================================================
// RESEND EMAIL
app.post('/api/v1/resend', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  resendEmail(req, res);
});

// ===========================================================================
// RESEND CONFIRMATION
app.post('/api/v1/resend-confirmation', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  req.query.type = 'confirm';
  resendEmail(req, res);
});

// ===========================================================================
// RESEND CHANGE PASSWORD
app.post('/api/v1/resend-change-password', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  req.query.type = 'reset';
  resendEmail(req, res);
});

//==================================================================================================
// Cleanup Expired Tokens
app.delete('/api/v1/cleanup-expired-tokens', adminRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
//  console.log('/api/v1/cleanup-expired-tokens');
  try {
    const [rows] = await db.query('DELETE FROM token WHERE expires_at < NOW()');
//    console.log('/api/v1/cleanup-expired-tokens','rows=',rows);

    if (!rows.affectedRows) {
      sendMessage(res, 'No expired tokens cleaned up.', 'info', null, 200); // Nothing deleted then no message
    } else {
      const delete_count = rows.affectedRows;
//      console.log('/api/v1/cleanup-expired-tokens','rows=',delete_count);
      sendMessage(res, `${delete_count} expired token(s) cleaned up successfully.`, 'info', null, 200);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//====================================================================================================================
// Admin User Search
app.get('/api/v1/users', adminRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { email, firstName, lastName, role, status, token, createStartDate, createEndDate, loginStartDate, loginEndDate } = req.query;
//  console.log('/api/v1/users','email=',email,'firstName=',firstName,'lastName=',lastName,'role=',role,'status=',status,'token=',token,'createStartDate=',createStartDate,'createEndDate=',createEndDate,'loginStartDate=',loginStartDate,'loginEndDate=',loginEndDate);
  const conditions = [];
  const params = [];
  if (email) {
    conditions.push('u.email LIKE ?');
    params.push(`%${email}%`);
  }
  if (firstName) {
    conditions.push('u.first_name LIKE ?');
    params.push(`%${firstName}%`);
  }
  if (lastName) {
    conditions.push('u.last_name LIKE ?');
    params.push(`%${lastName}%`);
  }
  if (role) {
    conditions.push('u.role LIKE ?');
    params.push(`${role}`);
  }
  if (status) {
    conditions.push('u.status LIKE ?');
    params.push(`${status}`);
  }
  if (token) {
    conditions.push('u.token LIKE ?');
    params.push(`%${token}%`);
  }
  if (createStartDate) {
    conditions.push('u.created_at >= ?');
    params.push(createStartDate);
  }
  if (createEndDate) {
    conditions.push('u.created_at <= ?');
    params.push(createEndDate);
  }
  if (loginStartDate) {
    conditions.push('u.last_login_at >= ?');
    params.push(loginStartDate);
  }
  if (loginEndDate) {
    conditions.push('u.last_login_at <= ?');
    params.push(loginEndDate);
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
//  console.log('/api/v1/users','where=',where,'params=',params);
  try {
    const [rows] = await db.execute(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.token, u.status, u.created_at, u.last_login_at, COUNT(d.id) AS num_designs FROM user u LEFT JOIN design d ON u.token = d.user ${where} GROUP BY u.id`,
      params
    );
    sendMessage(res, rows, '', null, 200);
  } catch (err) {
//    console.log('/api/v1/users','err=',err);
    sendMessage(res, err, 'error', null, 500);
  }
});

// =============================================================================
// Admin Create User
app.post('/api/v1/users', adminRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { email, password, first_name, last_name, role, status, token } = req.body;
  try {
    if (!isValidEmail(email)) {
      sendMessage(res, 'Invalid email address format.', 'error', 'email', 400);
      return;
    }
    if (!isValidPassword(password)) {
      sendMessage(res, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.', 'error', 'password', 400);
      return;
    }
    const [rows] = await db.execute('SELECT id FROM user WHERE email = ?', [email]);
    if (rows.length) {
      sendMessage(res, 'Email already exists.', 'error', null, 409);
      return;
    }
    const hashed = await hashPassword(password);
    const [result] = await db.execute('INSERT INTO user (email, password, first_name, last_name, role, token, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [email, hashed, first_name, last_name, role || 'user', token || null, status || 'active']);
    sendMessage(res, { id: result.insertId }, '', null, 201);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// =============================================================================
// Admin Update User
app.put('/api/v1/users/:id', adminRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { id } = req.params;
  const { email, first_name, last_name, role, status, token } = req.body;
  try {
    const fields = [];
    const params = [];
    if (email) {
      if (!isValidEmail(email)) {
        sendMessage(res, 'Invalid email address format.', 'error', 'email', 400);
        return;
      }
      fields.push('email = ?');
      params.push(email);
    }
    if (first_name !== undefined) {
      fields.push('first_name = ?');
      params.push(first_name);
    }
    if (last_name !== undefined) {
      fields.push('last_name = ?');
      params.push(last_name);
    }
    if (role) {
      fields.push('role = ?');
      params.push(role);
    }
    if (status) {
      fields.push('status = ?');
      params.push(status);
    }
    if (token !== undefined) {
      fields.push('token = ?');
      params.push(token);
    }
    if (!fields.length) {
      sendMessage(res, 'No fields provided.', 'error', null, 400);
      return;
    }
    params.push(id);
    const [rows] = await db.execute(`UPDATE user SET ${fields.join(', ')} WHERE id = ?`, params );
    if (rows.affectedRows === 0) {
      sendMessage(res, '', '', null, 404);
    } else {
      sendMessage(res, {}, '', null, 200);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//====================================================================================================================
// Admin Delete User
app.delete('/api/v1/users/:id', adminRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { id } = req.params;
//  console.log('/api/v1/users','id=',id);
  try {
    const [rows] = await db.execute('DELETE FROM user WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
      sendMessage(res, '', '', null, 404);
    } else {
      sendMessage(res, {}, '', null, 200);
    }
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

// ============================================================================
// Admin Login As User
app.post('/api/v1/users/:id/login-as', adminRequired, async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database disabled' });
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT email, token, first_name, last_name, role, status FROM user WHERE id = ?',
      [id]
    );
    if (!rows.length) {
      sendMessage(res, '', '', null, 404);
      return;
    }
    const user = rows[0];
    if (user.role !== 'user') {
      sendMessage(res, 'Cannot login as admin user.', 'error', null, 403);
      return;
    }
    req.session.user = {
      email: user.email,
      token: user.token,
      first_name: user.first_name,
      last_name: user.last_name,
      isAuthenticated: true,
      isAdmin: false,
    };
    sendMessage(res, '', '', null, 200);
  } catch (err) {
    sendMessage(res, err, 'error', null, 500);
  }
});

//==================================================================================================
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
