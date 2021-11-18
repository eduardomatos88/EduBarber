import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowProfileService from '@modules/users/services/ShowProfileService'
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService'

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id
    const create = container.resolve(ShowProfileService)
    const user = await create.execute({
      user_id,
    })
    return res.json(user)
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id
    const { name, email, old_password, password } = req.body
    const create = container.resolve(UpdateUserProfileService)
    const user = await create.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    })
    return res.json(user)
  }
}

export default ProfileController
