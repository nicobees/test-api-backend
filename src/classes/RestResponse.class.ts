import { httpResponseStatus } from '@root/utils'

export interface RestResponseDataInterface<DataType = Record<string, unknown> | Array<string | Record<string, unknown>>> {
  code: number
  msg: string
  records?: DataType
}

export abstract class RestResponse<ResponseObject> {
  constructor (
    protected status: httpResponseStatus,
    protected message: string
  ) {}

  protected abstract prepare<T extends RestResponse<ResponseObject>> (responseObject: ResponseObject, responseData: T): ResponseObject

  public abstract send (responseObject: ResponseObject): ResponseObject
}
