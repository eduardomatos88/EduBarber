import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const create = container.resolve(CreateUserService)
    const user = await create.execute({ name, email, password })
    return res.json(user)
  }
}

export default UsersController
