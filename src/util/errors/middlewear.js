const logger = require('./logger');

module.exports = (err, req, res, next) => {
  logger.error(err);
  res.status(err.code || 500).send(err.msg || 'Internal Server Error');
};
