import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middleware/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const create = new CreateUserService()

    const user = await create.execute({ name, email, password })
    return res.json(user)
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(400).json({ error: err.message })
    }
    return res.json({ error: 'Server error' })
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService()
      const user = await updateUserAvatar.execute({
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
  },
)

export default usersRouter
