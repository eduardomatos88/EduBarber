import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import uploadConfig from '@config/upload'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequestUpdateUserAvatar {
  user_id: string
  avatarFilename?: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    user_id,
    avatarFilename,
  }: IRequestUpdateUserAvatar): Promise<User> {
    if (!avatarFilename) {
      throw new AppError('Invalid avatar image')
    }
    const user = await this.usersRepository.findByID(user_id)
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename
    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
