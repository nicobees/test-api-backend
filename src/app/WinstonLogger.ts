/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import path from 'path'
import { createLogger, Logger, format, transports } from 'winston'

import { ServerConfig } from '@root/config'

export interface WinstonLoggerInterface<LoggerType = Logger> {
  getLogger: () => LoggerType
  error: (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>) => Logger
  warn: (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>) => Logger
  info: (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>) => Logger
  http: (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>) => Logger
  debug: (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>) => Logger
}

export class WinstonLogger implements WinstonLoggerInterface<Logger> {
  protected logger: Logger

  protected levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  }

  protected colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
  }

  protected format = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize({ all: true }),
    format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  )

  protected consoleFormat = format.combine(
    format.errors({ stack: true }),
    format.colorize({ colors: this.colors }),
    format.timestamp(),
    format.prettyPrint(),
    this.format
  )

  protected fileFormat = format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()
  )

  constructor (envConfig: ServerConfig) {
    this.logger = createLogger({
      levels: this.levels,
      transports: [
        new transports.Console({ level: envConfig.levelConsoleLogs, format: this.consoleFormat }),
        new transports.File({ level: envConfig.levelFileLogs, filename: path.resolve('logs', 'error.log'), format: this.fileFormat })
      ],
      // exceptionHandlers: [
      //   new transports.Console({format: this.consoleFormat}),
      //   new transports.File({ filename: 'error.log', format: this.fileFormat})
      // ],
      format: format.combine(
        format.errors({ stack: true })
      )
    })
  }

  public getLogger = (): Logger => {
    return this.logger
  }

  public error = (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>): Logger => {
    return this.logger.error(message, { ...meta, data: { ...data } })
  }

  public warn = (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>): Logger => {
    return this.logger.warn(message, { ...meta, data: { ...data } })
  }

  public info = (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>): Logger => {
    return this.logger.info(message, { ...meta, data: { ...data } })
  }

  public http = (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>): Logger => {
    return this.logger.http(message, { ...meta, data: { ...data } })
  }

  public debug = (message: string, meta?: Record<string, unknown>, data?: Record<string, unknown>): Logger => {
    return this.logger.debug(message, { ...meta, data: { ...data } })
  }
}
