import { ExpressMain } from '@root/app'
import { ServerConfig } from '@root/config'
import mongoose from 'mongoose'

describe('Express main class', () => {
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

  it('connects to the database', async () => {
    const expressMain = new ExpressMain()
    await expressMain.initialise(envConfig)

    expect(mongoose.connect).toBeCalledTimes(1)
  })

  it('logs error if any exception raises on initialisation', async () => {
    jest.spyOn(mongoose, 'connect').mockImplementation(jest.fn(() => { throw new Error('Test error') }))

    const expressMain = new ExpressMain()
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    expect(expressMain.initialise(envConfig)).rejects.toThrow()
    expect(console.error).toBeCalledTimes(1)
  })

  it('exposes Controller/s and Routes after initialisation', async () => {
    const expressMain = new ExpressMain()
    await expressMain.initialise(envConfig)

    const controllers = expressMain.getControllers()
    const controllerRoutes = expressMain.getControllerRoutes()

    expect(Array.isArray(controllers)).toBeTruthy()
    expect(controllers.length).toBeDefined()
    expect(controllers.length).toBeGreaterThanOrEqual(1)

    expect(Array.isArray(controllerRoutes)).toBeTruthy()
    expect(controllerRoutes.length).toBeDefined()
    expect(controllerRoutes.length).toBeGreaterThanOrEqual(1)
  })
})
