import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUser = container.resolve(AuthenticateUserService)
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })
    return res.json({ user: instanceToInstance(user), token })
  }
}

export default SessionsController
