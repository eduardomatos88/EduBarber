import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashRepository = new FakeHashProvider()
    const create = new CreateUserService(
      fakeUsersRepository,
      fakeHashRepository,
    )

    const user = await create.execute({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })
  it('should not be able to create two users with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashRepository = new FakeHashProvider()
    const create = new CreateUserService(
      fakeUsersRepository,
      fakeHashRepository,
    )

    await create.execute({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    expect(
      create.execute({
        name: 'John Doe',
        email: 'test@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
