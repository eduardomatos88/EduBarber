import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageRepository = new FakeStorageProvider()
    const update = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    )

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await update.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  })
  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageRepository = new FakeStorageProvider()
    const update = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    )

    await expect(
      update.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageRepository = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageRepository, 'deleteFile')
    const update = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    )

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await update.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await update.execute({
      user_id: user.id,
      avatarFilename: 'avatar-two.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar-two.jpg')
  })

  it('should not be able to update avatar from non existing avatar file', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageRepository = new FakeStorageProvider()

    const update = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    )

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await expect(
      update.execute({
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
