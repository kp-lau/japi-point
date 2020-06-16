var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/accounts', function (request, response) {
  var id = request.query.id;
  var accountsData = [
    {
      "id": 10001,
      "name": "Account 10001",
      "summary": {
        "price": {
          "currency": "hkd",
          "currencyTag": "HK$",
          "value": 1000.00
        },
        "cutoffDate": "2020-07-06",
        "dueDate": "2020-07-01",
        "extras": [{
          "label": "Previous Balance B/F",
          "price": {
            "currency": "hkd",
            "currencyTag": "HK$",
            "value": -200.00
          }
        }, {
          "label": "Current Charge",
          "price": {
            "currency": "hkd",
            "currencyTag": "HK$",
            "value": 500.00
          }
        }]
      }
    },
    {
      "id": 10002,
      "name": "Account 10002",
      "summary": {
        "price": {
          "currency": "hkd",
          "currencyTag": "HK$",
          "value": 900.00
        },
        "cutoffDate": "2020-07-15",
        "dueDate": "2020-07-10",
        "extras": [{
          "label": "Previous Balance B/F",
          "price": {
            "currency": "hkd",
            "currencyTag": "HK$",
            "value": 100.00
          }
        }, {
          "label": "Current Charge",
          "price": {
            "currency": "hkd",
            "currencyTag": "HK$",
            "value": 600.00
          }
        }]
      }
    },
    {
      "id": 10003,
      "name": "Account 10003",
      "summary": {
        "price": {
          "currency": "JPY",
          "currencyTag": "JPY$",
          "value": 7200.00
        },
        "cutoffDate": "2020-07-20",
        "dueDate": "2020-07-12",
        "extras": [{
          "label": "Previous Balance B/F",
          "price": {
            "currency": "JPY",
            "currencyTag": "JPY$",
            "value": 0.00
          }
        }, {
          "label": "Current Charge",
          "price": {
            "currency": "JPY",
            "currencyTag": "JPY$",
            "value": 5000.00
          }
        }]
      }
    }
  ];

  var result;
  if (id) {
    result = accountsData.filter(x.id === id);
  } else {
    result = accountsData;
  }

  response.send(JSON.parse(JSON.stringify(result)));
});


app.get('/api/test', function (request, response) {
  var result = {};
  response.send(JSON.parse(JSON.stringify(result)));
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
