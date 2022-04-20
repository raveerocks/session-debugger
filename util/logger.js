const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const consoleLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(
      colorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss:SSS' }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
};

const logger = consoleLogger();

module.exports = { logger };
