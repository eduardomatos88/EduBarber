import 'reflect-metadata'
import cors from 'cors'
import express from 'express'

import uploadConfig from '@config/upload'

import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

const server = express()

server.use(cors())

server.use(express.json())

server.use('/files', express.static(uploadConfig.directory))

server.use(routes)

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333')
})
