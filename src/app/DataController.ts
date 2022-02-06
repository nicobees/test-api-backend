import { Router, Request, Response, NextFunction } from 'express'

import { Controller } from '@root/classes'
import { ApiResponse } from '@root/utils/expressUtils'
import { DataRepositoryInterface } from '.'

export class DataController extends Controller<Router> {
  constructor (private readonly dataRepository: DataRepositoryInterface) {
    super()
    this.setPath('/')
    this.setRouter(Router())

    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    this.router.post(this.path, this.getData)
  }

  private readonly getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.dataRepository.getDataByDateAndCount(new Date('2016-01-01'), new Date('2016-01-04'), 93, 4603)

      new ApiResponse('Success', data).send(res)
      return
    } catch (e) {
      next(e)
    }
  }
}
