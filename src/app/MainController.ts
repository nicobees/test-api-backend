import { Router, Request, Response, NextFunction } from 'express'

import { Controller } from '@root/classes'
import { ApiResponse } from '@root/utils/expressUtils'

export default class MainController extends Controller<Router> {
  constructor () {
    super()
    this.setPath('/')
    this.setRouter(Router())

    this.router.post(this.path, this.getData)
  }

  private readonly getData = (req: Request, res: Response, next: NextFunction): void => {
    try {
      new ApiResponse('response data', [{ id: 1, name: 'test' }, { id: 2, name: 'temp' }]).send(res)
    } catch (e) {
      next(e)
    }
  }
}
