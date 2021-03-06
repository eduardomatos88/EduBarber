import { inject, injectable } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'

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
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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
      this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename
    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
