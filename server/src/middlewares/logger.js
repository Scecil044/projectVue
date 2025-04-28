const winston = require('winston');
const config = require('../config/config');

class StringTransport extends winston.Transport {
  constructor(opts) {
    super(opts);
    this.logString = '';
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const message = `${info.level}: ${info.message}`;
    this.logString = message;
    callback();
  }
}
const logFormat = winston.format.printf(({ level, message }) => {
  return `${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format((info, opts) => {
        // colurize if env is development
        if (config.env === 'test' || config.env === 'development') {
          info.level = `\x1b[32m${info.level}\x1b[0m`;
        }
      return info;
    })(),
    logFormat
  ),
  transports: [
    new StringTransport(),
    new winston.transports.Console(),
  ]
});

module.exports = logger;
