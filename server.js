//const express = require('express');
//const { initialState } = require('./client/src/initialState');
//
//const app = express();
//
//app.get('/api/designs/pcyl/models/startup', (req, res) => {
//    console.log("In server /api/designs/pcyl/models/startup");
//    res.json(initialState);
//});
//
//const port = 5000;
//
//app.listen(port, () => `Server running on port ${port}`);




const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000);