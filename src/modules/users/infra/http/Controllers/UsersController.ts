import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

import AppError from '@shared/errors/AppError'

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body
      const create = container.resolve(CreateUserService)
      const user = await create.execute({ name, email, password })
      return res.json(user)
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(400).json({ error: err.message })
      }
      return res.json({ error: 'Server error' })
    }
  }
}

export default UsersController
