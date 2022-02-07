import { DataRepository, WinstonLogger } from '@root/app'
import { ServerConfig } from '@root/config'
import dataModel from '@root/app/Data'
import { mockedData } from '@root/__mocks__/mockedData'

describe('DataRepository', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
    jest.spyOn(console, 'log').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const envConfig: ServerConfig = {
    environment: 'dev',
    port: 3000,
    db: '',
    levelConsoleLogs: 'debug',
    levelFileLogs: 'error'
  }

  const injectedLogger = new WinstonLogger(envConfig)

  const dataRepository = new DataRepository(injectedLogger)

  describe('exposes the method getDataByDateAndCount', () => {
    it('should be defined', () => {
      expect(dataRepository.getDataByDateAndCount).toBeDefined()
    })

    it('should return data of type Array<DataBaseDocument>', async () => {
      const inputData = {
        startDate: new Date('2016-01-01'),
        endDate: new Date('2016-01-04'),
        minCount: 932,
        maxCount: 4603
      }

      jest.spyOn(dataModel, 'aggregate').mockImplementationOnce(() => mockedData as any)

      const data = await dataRepository.getDataByDateAndCount(inputData.startDate, inputData.endDate, inputData.minCount, inputData.maxCount)

      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(14)
      expect(data[0]).toMatchObject({
        key: 'KBcZdWND',
        createdAt: '2016-01-04T19:03:02.123Z',
        totalCount: 4034
      })
    })

    it('should log error if any exception is thrown inside the function', async () => {
      const inputData = {
        startDate: new Date('2016-01-01'),
        endDate: new Date('2016-01-04'),
        minCount: 932,
        maxCount: 4603
      }

      jest.spyOn(dataModel, 'aggregate').mockImplementationOnce(() => { throw new Error('test error') })
      const spyLogger = jest.spyOn(injectedLogger, 'error')

      /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
      expect(dataRepository.getDataByDateAndCount(inputData.startDate, inputData.endDate, inputData.minCount, inputData.maxCount)).rejects.toThrow()
      expect(spyLogger).toBeCalledTimes(1)
    })
  })
})
