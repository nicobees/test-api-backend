import { RestResponse, RestResponseDataInterface } from '@root/classes'
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

export class ApiResponse<DataType> extends RestResponse<Response> {
  constructor (message: string, protected data: DataType, status: httpResponseStatus = httpResponseStatus.SUCCESS) {
    super(status, message)
  }

  protected prepare<DataType> (responseObject: Response, responseData: DataType): Response {
    const result: RestResponseDataInterface<DataType> = {
      code: 0,
      msg: this.message,
      records: responseData
    }

    return responseObject.status(this.status).json(result)
  }

  public send (responseObject: Response): Response {
    return this.prepare<DataType>(responseObject, this.data)
  }
}
