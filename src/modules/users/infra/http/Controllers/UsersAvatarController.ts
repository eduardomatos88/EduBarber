import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

import AppError from '@shared/errors/AppError'

class UsersAvatarController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const update = container.resolve(UpdateUserAvatarService)
      const user = await update.execute({
        user_id: req.user.id,
        avatarFilename: req.file?.filename,
      })
      return res.json(user)
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(400).json({ error: err.message })
      }
      return res.json({ error: 'Server error' })
    }
  }
}

export default UsersAvatarController
