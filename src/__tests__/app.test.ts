import { Application } from 'express'
import request from 'supertest'

import appExpress from '@root/app/app'
import { ServerConfig } from '@root/config'
import { httpResponseStatus } from '@root/utils'

describe('express app', () => {
  let app: Application
  const envConfig: ServerConfig = {
    environment: 'dev',
    port: 3000
  }

  beforeAll(async () => {
    app = await appExpress(envConfig)
  })

  it('should return http error code 404 if request is different from POST', async () => {
    await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(httpResponseStatus.NOT_FOUND)
      .expect({ code: 404, msg: 'Not Found' })
  })
})

export {}
