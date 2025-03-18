const winston = require("winston");
const expressWinston = require("express-winston");

const messageFromat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, meta, timestamp }) => {
    `${timestamp} ${level} : ${meta.error?.stack || message}`;
  })
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFromat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

const errorLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
