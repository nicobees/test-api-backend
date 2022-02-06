import { PipelineStage } from 'mongoose'
import { WinstonLoggerInterface } from '.'
import dataModel, { DataBaseDocument, DataInterface } from './Data'

export interface DataRepositoryInterface {
  getDataByDateAndCount: (minDate: DataInterface['createdAt'], maxDate: DataInterface['createdAt'], minCount: number, maxCount: number) => Promise<DataBaseDocument[]>
}

export class DataRepository<LoggerType extends WinstonLoggerInterface> implements DataRepositoryInterface {
  constructor (private readonly logger: LoggerType) {

  }

  public getDataByDateAndCount = async (minDate: DataInterface['createdAt'], maxDate: DataInterface['createdAt'], minCount: number, maxCount: number): Promise<DataBaseDocument[]> => {
    try {
      const aggregateFunction: PipelineStage[] = [
        {
          $project: {
            _id: 0,
            key: 1,
            createdAt: 1,
            totalCount: {
              $sum: '$counts'
            }
          }
        }, {
          $match: {
            createdAt: {
              $gte: minDate,
              $lt: maxDate
            }
          }
        },
        {
          $match: {
            totalCount: {
              $gt: minCount,
              $lte: maxCount
            }
          }
        }
      ]
      const data = await dataModel.aggregate<DataBaseDocument>(aggregateFunction)

      return data
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(e.message)
      } else {
        console.error(e)
      }
      throw e
    }
  }
}
