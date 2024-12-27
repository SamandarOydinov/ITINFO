const config = require('config');
const winston = require('winston');

require("winston-mongodb")

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, json, prettyPrint, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message} `;
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), myFormat),
  transports: [
    new transports.Console({ level: "silly" }),
    new transports.File({ filename: "./log/error.log", level: "error" }),
    new transports.File({ filename: "./log/combine.log", level: "info" }),
    new transports.MongoDB({
      db: config.get("dbAtlasUri"),
    //   options: { useUnifiedTopology: true },
    }),
  ],
});

logger.exitOnError = false

logger.exceptions.handle(
  new transports.File({ filename: "./log/exceptions.log" })
);
logger.rejections.handle(
  new transports.File({ filename: "./log/rejections.log" })
);

module.exports = logger