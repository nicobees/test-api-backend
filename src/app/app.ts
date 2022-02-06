import express, { Application } from 'express'

import { applyErrorHandlers } from '@root/utils'
import { ServerConfig } from '@root/config'
import { ExpressMain } from '.'

export const appExpress = async (envConfig: ServerConfig): Promise<Application> => {
  const app: Application = express()

  const expressMain = new ExpressMain()
  await expressMain.initialise(envConfig)

  app.use(express.json())

  for (const route of expressMain.getControllerRoutes()) {
    app.use('/', route)
  }

  // error handlers
  applyErrorHandlers(envConfig.environment, app)

  return app
}
