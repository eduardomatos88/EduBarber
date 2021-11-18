import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserProfileService from './UpdateUserProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let update: UpdateUserProfileService

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    update = new UpdateUserProfileService(fakeUsersRepository, fakeHashProvider)
  })
  it('should be able to update the profile user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await update.execute({
      user_id: user.id,
      name: 'John Duo',
      email: 'test@johnduo.com',
    })

    expect(user.name).toBe('John Duo')
    expect(user.email).toBe('test@johnduo.com')
  })
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@example.com',
      password: '123456',
    })

    await expect(
      update.execute({
        user_id: user.id,
        name: 'John Duo',
        email: 'test@johndoe.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await update.execute({
      user_id: user.id,
      name: 'John Duo',
      email: 'test@johnduo.com',
      old_password: '123456',
      password: '123123',
    })

    expect(user.password).toBe('123123')
  })

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await expect(
      update.execute({
        user_id: user.id,
        name: 'John Duo',
        email: 'test@johnduo.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await expect(
      update.execute({
        user_id: user.id,
        name: 'John Duo',
        email: 'test@johnduo.com',
        old_password: '123123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to show profile from a non-existing user', async () => {
    await expect(
      update.execute({
        user_id: 'non-existing-id',
        name: 'test',
        email: 'test@test.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
