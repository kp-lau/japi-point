var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

// Default account data (all)
app.get('/api/all', async function (request, response) {
  fs.readFile('./data/defaultAll.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.parse(data));
  })
});

// Account data
app.get('/api/accounts', function (request, response) {
  var id = request.query.id;

  fs.readFile('./data/accounts.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    var result;
    var accountsData = JSON.parse(data);

    if (id) {
      result = accountsData.filter(x => x.id === parseInt(id));
    } else {
      result = accountsData;
    }

    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.parse(JSON.stringify(result)));
  })
});

// Payment data
app.get('/api/payhistory', function (request, response) {
  var accountId = request.query.accountId;

  fs.readFile('./data/paymentHistory.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    var result;
    var paymentData = JSON.parse(data);

    if (accountId) {
      result = paymentData.filter(x => x.accountId === parseInt(accountId));
    } else {
      result = paymentData;
    }

    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.parse(JSON.stringify(result)));
  })
});

// Gadget data
app.get('/api/settings', function (request, response) {
  fs.readFile('./data/gadgetSettings.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.parse(data));
  })
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
