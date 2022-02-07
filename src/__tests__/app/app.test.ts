import { Application } from 'express'
import request from 'supertest'

import { ServerConfig } from '@root/config'
import { httpResponseStatus } from '@root/utils'
import { appExpress } from '../../app/app'
import dataModel from '@root/app/Data'
import { mockedData } from '@root/__mocks__/mockedData'

describe('Exposed API', () => {
  let app: Application
  const envConfig: ServerConfig = {
    environment: 'dev',
    port: 3000,
    db: '',
    levelConsoleLogs: 'debug',
    levelFileLogs: 'error'
  }

  beforeAll(async () => {
    app = await appExpress(envConfig)
  })

  it('should return http error code 404 if request is different from POST', async () => {
    await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(httpResponseStatus.NOT_FOUND)
      .expect({ code: httpResponseStatus.NOT_FOUND, msg: 'Not Found' })

    await request(app)
      .put('/')
      .expect('Content-Type', /json/)
      .expect(httpResponseStatus.NOT_FOUND)
      .expect({ code: httpResponseStatus.NOT_FOUND, msg: 'Not Found' })
  })

  it('should return http error code 400 and specific message in case of invalid body data', (done) => {
    let bodyRequest = {}

    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    request(app)
      .post('/')
      .send(bodyRequest)
      .expect('Content-Type', /json/)
      .expect(httpResponseStatus.BAD_REQUEST)
      .end((err, res) => {
        if (err !== null) return done(err)
        expect(res.body.code).toBe(httpResponseStatus.BAD_REQUEST)
        expect(res.body.msg).toMatch(/must be defined/)
        done()
      })

    bodyRequest = {
      startDate: '2016-01-0',
      endDate: '2016-01-04',
      minCount: 932,
      maxCount: 4603
    }

    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    request(app)
      .post('/')
      .send(bodyRequest)
      .expect('Content-Type', /json/)
      .expect(httpResponseStatus.BAD_REQUEST)
      .end((err, res) => {
        if (err !== null) return done(err)
        expect(res.body.code).toBe(httpResponseStatus.BAD_REQUEST)
        expect(res.body.msg).toMatch(/startDate: must be in the format "YYYY-MM-DD"/)
        done()
      })

    bodyRequest = {
      startDate: '2016-01-01',
      endDate: '2016-01-04',
      minCount: 'test',
      maxCount: 4603
    }

    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    request(app)
      .post('/')
      .send(bodyRequest)
      .expect('Content-Type', /json/)
      .expect(httpResponseStatus.BAD_REQUEST)
      .end((err, res) => {
        if (err !== null) return done(err)
        expect(res.body.code).toBe(httpResponseStatus.BAD_REQUEST)
        expect(res.body.msg).toMatch(/minCount: must be a number/)
        done()
      })
  })

  it('should return http error 200 and specific success response body if request body is valid', (done) => {
    const bodyRequest = {
      startDate: '2016-01-01',
      endDate: '2016-01-04',
      minCount: 932,
      maxCount: 4603
    }

    jest.spyOn(dataModel, 'aggregate').mockImplementationOnce(() => mockedData as any)

    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    request(app)
      .post('/')
      .send(bodyRequest)
      .expect('Content-Type', /json/)
      .expect(httpResponseStatus.SUCCESS)
      .end((err, res) => {
        if (err !== null) return done(err)
        expect(res.body.code).toBe(0)
        expect(res.body.msg).toBe('Success')
        expect(res.body.records).toBeDefined()
        expect(Array.isArray(res.body.records)).toBe(true)
        expect(res.body.records.length).toBe(14)
        expect(res.body.records[0]).toMatchObject({
          key: 'KBcZdWND',
          createdAt: '2016-01-04T19:03:02.123Z',
          totalCount: 4034
        })
        done()
      })
  })
})

export {}
