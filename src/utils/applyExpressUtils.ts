import { Router, Request, Response, NextFunction } from 'express'
import { ServerConfig } from '@root/config'
import { httpResponseStatus } from '.'
import { ApiError } from './ApiError'

export const applyErrorHandlers = (environment: ServerConfig['environment'], router: Router): void => {
  router.use((req, res, next) => { next(new ApiError(httpResponseStatus.NOT_FOUND, 'Not Found')) })

  router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
      ApiError.handle(error, res)
    } else {
      ApiError.handle(new ApiError(), res)
    }
  })
}
