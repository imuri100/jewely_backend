import { config } from 'dotenv'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import Routes from './routes'

import { AppError } from './erros/AppError'
import { createConnection } from './database'
import('reflect-metadata')

config()
createConnection()

const server = express()

server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(Routes)

server.use(express.static('src/views'))
server.use('/pdf', express.static('src/pdf'))

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

server.listen(process.env.PORT || 3334, () => {
  console.log('🚀 server is runnig')
})
