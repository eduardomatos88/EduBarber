import { Request, Response } from 'express'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

import AppError from '@shared/errors/AppError'

import UsersRepository from '../../typeorm/repositories/UsersRepository'

class SessionsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const usersRepository = new UsersRepository()
      const authenticateUser = new AuthenticateUserService(usersRepository)
      const { user, token } = await authenticateUser.execute({
        email,
        password,
      })

      return res.json({ user, token })
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message })
      }
      return res.json({ error: 'Server error' })
    }
  }
}

export default SessionsController
