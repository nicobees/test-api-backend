import { Router } from 'express'
import mongoose from 'mongoose'

import { Controller } from '@root/classes'
import { ServerConfig } from '@root/config'
import { DataController, DataRepository } from '.'

export class ExpressMain {
  private readonly controllerRoutes!: Router[]
  protected controllers: Array<Controller<Router>> = []

  constructor () {
    this.controllerRoutes = []
  }

  public initialise = async (envConfig: ServerConfig): Promise<void> => {
    try {
      await mongoose.connect(envConfig.db)

      const dataRepository = new DataRepository()
      const dataController = new DataController(dataRepository)

      this.controllers.push(dataController)
      this.controllerRoutes.push(dataController.getRouter())
    } catch (e) {
      console.error(e)
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
