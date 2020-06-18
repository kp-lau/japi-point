module.exports = function setHeader(req, res, next) {

  // console.log('Middleware: setting header - ', Date.now());
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  next();
};
