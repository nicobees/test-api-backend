import express, { Application } from 'express'

import { ApiError, applyErrorHandlers, httpResponseStatus } from '@root/utils'
import { ServerConfig } from '@root/config'

export default async (envConfig: ServerConfig): Promise<Application> => {
  const app: Application = express()

  app.use(express.json())

  app.post('/', (req, res, next) => {
    res.json({ result: true })
  })

  app.post('/test-bad-request', (req, res, next) => {
    next(new ApiError(httpResponseStatus.BAD_REQUEST, 'test custom error'))
  })

  // error handlers
  applyErrorHandlers(envConfig.environment, app)

  return app
}
