import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const update = container.resolve(UpdateUserAvatarService)
    const user = await update.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename,
    })
    return res.json(instanceToInstance(user))
  }
}

export default UsersAvatarController
