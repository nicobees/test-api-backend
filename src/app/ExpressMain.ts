import { Router } from 'express'

import { Controller } from '@root/classes'
import MainController from './MainController'

export class ExpressMain {
  private readonly controllerRoutes!: Router[]
  protected controllers: Array<Controller<Router>> = []

  constructor () {
    this.controllerRoutes = []
  }

  public initialise = async (): Promise<void> => {
    try {
      const mainController = new MainController()

      this.controllers.push(mainController)
      this.controllerRoutes.push(mainController.getRouter())
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
