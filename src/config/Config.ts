export interface Config {
  server: ServerConfig
}

export interface ServerConfig {
  environment: string
  port: number
  db: string
  levelConsoleLogs: string
  levelFileLogs: string
}
