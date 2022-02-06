/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Config } from './Config'

/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
export = {
  server: {
    environment: process.env.NODE_ENV ?? 'dev',
    port: parseInt(process.env.PORT ?? '') ?? 3000, // TODO@v2.0.0 - manage auto validation for environment variables
    db: process.env.MONGO_URL ?? ''
  }
} as Config

// `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
