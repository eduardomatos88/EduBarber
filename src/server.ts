import 'reflect-metadata'
import express from 'express'
import cors from 'cors'

import routes from './routes'

import uploadConfig from './config/upload'

import './database'

const server = express()

server.use(cors())

server.use(express.json())

server.use('/files', express.static(uploadConfig.directory))

server.use(routes)

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333')
})
