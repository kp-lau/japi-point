const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const languages = {
  'en-US': 'en',
  'zh-Hant-TW': 'tc',
  'zh-Hans-CN': 'sc',
};

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());

// MIDDLEWARE --------------------------------
const setHeader = require('./middleware/setHeader');
app.use(setHeader);

// API ---------------------------------------
// API (1): Gadget Data (default)
app.get('/api/settings/:lang', function (req, res) {
  const lang = applyLangDir(req.params.lang);

  fs.readFile(`./data/${lang}/gadgetSettings.json`, 'utf8', (err, data) => {
    if (err) { throw err; }

    res.send(JSON.parse(data));
  })
});
app.get('/api/settings', function (req, res) {
  fs.readFile('./data/en/gadgetSettings.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    res.send(JSON.parse(data));
  })
});

// API (2): Account Data
app.get('/api/accounts/:id/:lang', function (req, res) {
  const id = req.params.id;
  const lang = applyLangDir(req.params.lang);

  fs.readFile(`./data/${lang}/accounts.json`, 'utf8', (err, data) => {
    if (err) { throw err; }

    let result;
    let accountsData = JSON.parse(data);

    if (id && parseInt(id)) {
      result = accountsData.filter(x => x.id === parseInt(id));
    } else {
      result = accountsData;
    }

    res.send(JSON.parse(JSON.stringify(result)));
  })
});
app.get('/api/accounts/:id', function (req, res) {
  const id = req.params.id;

  fs.readFile('./data/en/accounts.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    let result;
    let accountsData = JSON.parse(data);

    if (id && parseInt(id)) {
      result = accountsData.filter(x => x.id === parseInt(id));
    } else {
      result = accountsData;
    }

    res.send(JSON.parse(JSON.stringify(result)));
  })
});
app.get('/api/accounts', function (req, res) {
  fs.readFile('./data/en/accounts.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    res.send(JSON.parse(data));
  })
});

// API (3): Payment Data
app.get('/api/payhistory/:id/:lang', function (req, res) {
  const id = req.params.id;
  const lang = applyLangDir(req.params.lang);

  fs.readFile(`./data/${lang}/paymentHistory.json`, 'utf8', (err, data) => {
    if (err) { throw err; }

    let result;
    let paymentData = JSON.parse(data);

    if (id && parseInt(id)) {
      result = paymentData.filter(x => x.accountId === parseInt(id));
    } else {
      result = paymentData;
    }

    res.send(JSON.parse(JSON.stringify(result)));
  })
});
app.get('/api/payhistory/:id', function (req, res) {
  const id = req.params.id;

  fs.readFile('./data/en/paymentHistory.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    let result;
    let paymentData = JSON.parse(data);

    if (id && parseInt(id)) {
      result = paymentData.filter(x => x.accountId === parseInt(id));
    } else {
      result = paymentData;
    }

    res.send(JSON.parse(JSON.stringify(result)));
  })
});
app.get('/api/payhistory', function (req, res) {
  fs.readFile('./data/en/paymentHistory.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    res.send(JSON.parse(data));
  })
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

function applyLangDir(lang) {
  console.log('Apply Language Directory: ', lang, languages[lang]);

  if (languages[lang]) {
    return languages[lang];
  } else {
    // Default English
    return languages['en-US'];
  }
}
