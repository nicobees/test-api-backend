import { Router } from 'express'
import mongoose from 'mongoose'

import { Controller } from '@root/classes'
import { ServerConfig } from '@root/config'
import { DataController, DataRepository } from '.'
import { WinstonLogger } from './WinstonLogger'

export class ExpressMain {
  private readonly controllerRoutes!: Router[]
  protected controllers: Array<Controller<Router>> = []

  constructor () {
    this.controllerRoutes = []
  }

  public initialise = async (envConfig: ServerConfig): Promise<void> => {
    const logger = new WinstonLogger(envConfig)

    try {
      await mongoose.connect(envConfig.db)

      const dataRepository = new DataRepository(logger)
      const dataController = new DataController(logger, dataRepository)

      this.controllers.push(dataController)
      this.controllerRoutes.push(dataController.getRouter())
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        logger.error(e.message)
      }
      throw e
    }
  }

  public getControllerRoutes = (): ExpressMain['controllerRoutes'] => {
    return this.controllerRoutes
  }

  public getControllers = (): ExpressMain['controllers'] => {
    return this.controllers
  }
}
