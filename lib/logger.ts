import winston from 'winston'
import { format } from 'winston'

const loggerFormat = format.combine(
  format.errors({ stack: false }),
  format.timestamp(),
  format.json(),
  format.colorize()
)

const consoleFormat = {
  format: format.combine(
    format.splat(),
    format.simple(),
    format.errors({ stack: false }),
    format.colorize(),
  ),
  level: 'info',
  handleExceptions: true,
  json: false,
}

const logger = winston.createLogger({
  level: 'info',
  format: loggerFormat,
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console(consoleFormat)
  ]
})

winston.add(logger)
export default logger