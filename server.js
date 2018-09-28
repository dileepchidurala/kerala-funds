const express = require('express'),
  app = express(),
  bodyParser = require('body-Parser'),
  path = require('path'),
  http = require('http'),
  cors = require('cors'),
  api = require('./server/routes/api'),
  serverdetails = require('./DetailsFolder/serverip'),
  serverip = new serverdetails();

app.use(
  cors({
    origin: `http://${serverip.ipaddress}:${serverip.port}/`,
    credentials: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist/keralafundproject')));

app.use('/user', function(req, res, next) {
  var nodeSSPI = require('node-sspi');
  var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true,
    authoritative: false
  });
  nodeSSPIObj.authenticate(req, res, function(err) {
    res.finished || next();
  });
});

app.use('/user', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ name: req.connection.user }));
});

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/keralafundproject/index.html'));
});

const port = process.env.PORT || serverip.port;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on port number:${port}`));
