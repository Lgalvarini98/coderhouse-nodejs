import winston from 'winston';

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
      new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    ],
  })
  return prodLogger
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: 'info' })],
  })
  return devLogger
}

let logger = null

if (process.env.NODE_ENV === 'production') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

export default logger