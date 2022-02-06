import { Response } from 'express'
import { httpResponseStatus } from '.'

export class ApiError extends Error {
  constructor (private readonly httpCode: number = httpResponseStatus.INTERNAL_SERVER_ERROR, public message: string = 'error') {
    super(message)
  }

  public static handle (err: ApiError, res: Response): Response {
    return res.status(err.httpCode).json({ code: err.httpCode, msg: err.message })
  }
}
