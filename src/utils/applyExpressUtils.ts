import { Router, Request, Response, NextFunction } from 'express'
import { ValidationChain, ValidationError, validationResult } from 'express-validator'

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

export const applyValidate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(async validation => await validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const errorResult = errors.array({ onlyFirstError: true }).reduce((result: string, err: ValidationError) => {
      return `${result}${result === '' ? '' : ' ---- '}${err.param}: ${String(err.msg)}`
    }, '')

    next(new ApiError(httpResponseStatus.BAD_REQUEST, errorResult))
  }
}
