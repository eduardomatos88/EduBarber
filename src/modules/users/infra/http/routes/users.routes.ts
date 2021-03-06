import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'

import UsersAvatarController from '../Controllers/UsersAvatarController'
import UsersController from '../Controllers/UsersController'

const usersRouter = Router()
const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()
const upload = multer(uploadConfig.multer)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
)

export default usersRouter
