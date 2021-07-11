import { config } from 'dotenv'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import Routes from './routes'
import nunjucks from 'nunjucks'

import { AppError } from './erros/AppError'
import { createConnection } from './database'

config()
createConnection()

const server = express()

server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(Routes)

server.set('view engine', 'njk')

nunjucks.configure('src/views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.use(express.static('src/views'))

server.use(
  (err: Error, resquest: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }
    return response.status(500).json({
      status: { error: 'error', err },
      message: 'Internal server Error'
    })
  }
)

server.listen(3334, () => {
  console.log('🚀 server is runnig')
})
