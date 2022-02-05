import express, { Application } from 'express'

import { applyErrorHandlers } from '@root/utils'
import { ServerConfig } from '@root/config'
import { ExpressMain } from '.'

export default async (envConfig: ServerConfig): Promise<Application> => {
  const app: Application = express()

  const expressMain = new ExpressMain()
  await expressMain.initialise()

  app.use(express.json())

  for (const route of expressMain.getControllerRoutes()) {
    app.use('/', route)
  }

  // app.post('/', (req, res, next) => {
  //   res.json({ result: true })
  // })

  // app.post('/test-bad-request', (req, res, next) => {
  //   next(new ApiError(httpResponseStatus.BAD_REQUEST, 'test custom error'))
  // })

  // error handlers
  applyErrorHandlers(envConfig.environment, app)

  return app
}
