/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Config } from './Config'

const config: Config = {
  server: {
    environment: process.env.NODE_ENV ?? 'dev',
    port: parseInt(process.env.PORT ?? '') ?? 3000 // TODO@v2.0.0 - manage auto validation for environment variables
  }
}

export default config
