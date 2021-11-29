import 'reflect-metadata'
import 'dotenv/config'
import { errors } from 'celebrate'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import globalExceptionHandler from '@shared/errors/globalExceptionHandler'

import uploadConfig from '@config/upload'

import routes from './routes'
import rateLimiter from './routes/middlewares/rateLimiter'

import '@shared/infra/typeorm'
import '@shared/container'

const server = express()

server.use(rateLimiter)
server.use(cors())
server.use(express.json())
server.use('/files', express.static(uploadConfig.tmpFolder))
server.use(routes)

server.use(errors())

server.use(globalExceptionHandler)

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333')
})
