import { Response } from 'express'
import { httpResponseStatus } from '.'

export class ApiError extends Error {
  constructor (private readonly httpCode: httpResponseStatus = httpResponseStatus.INTERNAL_SERVER_ERROR, public message: string = 'error') {
    super(message)
  }

  public static handle (err: ApiError, res: Response): Response {
    return res.status(err.httpCode).json({ code: err.httpCode, msg: err.message })
  }
}

export class ApiResponse {
  constructor (private readonly httpCode: httpResponseStatus = httpResponseStatus.SUCCESS, public message: string = 'success') {

  }

  public static handle (apiResponse: ApiResponse, res: Response): Response {
    return res.status(apiResponse.httpCode).json({ code: 0, msg: apiResponse.message })
  }
}
