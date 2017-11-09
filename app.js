var express = require('express');
var cors = require('cors')
var http = require('http');
var bodyParser = require('body-parser');

var authorisations = require('./app/routes/authorisations');

var app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('./app/views'));
app.use('/authorisations', authorisations)

var port = process.env.PORT || '3000'
app.set('port', port);

var server = http.createServer(app);

console.log(`Listening at http://localhost:${port}`)
server.listen(port);
