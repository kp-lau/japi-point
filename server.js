var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

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

    response.send(JSON.parse(JSON.stringify(result)));
  })
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
