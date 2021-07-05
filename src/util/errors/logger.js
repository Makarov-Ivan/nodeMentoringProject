const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    level: 0,
    format: format.combine(format.json(), format.colorize()),
    transports: [new transports.Console()]
})