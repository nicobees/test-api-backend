import { Router, Request, Response, NextFunction } from 'express'
import { body, ValidationChain } from 'express-validator'

import { Controller } from '@root/classes'
import { ApiResponse } from '@root/utils/expressUtils'
import { DataRepositoryInterface, WinstonLoggerInterface } from '.'
import { applyValidate } from '@root/utils'

const postDataRequestValidations: ValidationChain[] = [
  body('startDate')
    .exists().withMessage('"startDate" must be defined')
    .isDate({ format: 'YYYY-MM-DD' }).withMessage('must be in the format "YYYY-MM-DD"'),
  body('endDate')
    .exists().withMessage('"endDate" must be defined')
    .isDate({ format: 'YYYY-MM-DD' }).withMessage('must be in the format "YYYY-MM-DD"'),
  body('minCount')
    .exists().withMessage('"minCount" must be defined')
    .isNumeric().withMessage('must be a number'),
  body('maxCount')
    .exists().withMessage('"maxCount" must be defined')
    .isNumeric().withMessage('must be a number')
]

export class DataController<LoggerType extends WinstonLoggerInterface> extends Controller<Router> {
  constructor (private readonly logger: LoggerType, private readonly dataRepository: DataRepositoryInterface) {
    super()
    this.setPath('/')
    this.setRouter(Router())

    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    this.router.post(this.path, applyValidate(postDataRequestValidations), this.getData)
  }

  private readonly getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { startDate, endDate, minCount, maxCount } = req.body

      const startDateFormatted = new Date(`${String(startDate)}T00:00:00`) // TODO v2.0.0 - manage localisation and timezone if needed
      const endDateFormatted = new Date(`${String(endDate)}T23:59:59.999`)

      const data = await this.dataRepository.getDataByDateAndCount(startDateFormatted, endDateFormatted, minCount, maxCount)

      new ApiResponse('Success', data).send(res)
      return
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(e.message)
      }
      next(e)
    }
  }
}
