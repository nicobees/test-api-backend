import path from 'path'
import http from 'http'
import app from '@root/app'

import { onServerError } from '@root/utils'
import { ServerConfig } from '@root/config'

process.env.NODE_CONFIG_DIR = path.join(__dirname, './config/')
// eslint-disable-next-line import/first
import config from 'config'

process.on('uncaughtException', e => {
  console.log(e)
  process.exit(1)
})

process.on('unhandledRejection', e => {
  console.log(e)
  process.exit(1)
})

try {
  const envConfig = config.get<ServerConfig>('server')

  app(envConfig)
    .then(app => {
      const server = http.createServer(app)

      server
        .listen(envConfig.port, () => {
          console.info(`[${process.env.npm_package_name ?? ''}] Server is running on port: ${String(envConfig.port)}`)
        })
        .on('error', onServerError)
    })
    .catch((e: Error) => {
      throw e
    })
} catch (e) {
  console.error(e)
  process.exit(1)
}
