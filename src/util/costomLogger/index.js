const R = require('ramda');

module.exports = (req, res, next) => {
  const {
    method, originalUrl, body, query,
  } = req;
  const safeBody = R.clone(body);
  if (originalUrl === '/login' && method === 'POST') {
    safeBody.password = '****';
  }
  console.log('\nLogging request with following data:', {
    method, originalUrl, safeBody, query, date: new Date().toGMTString(),
  });
  next();
};
