import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticate = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
    const create = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await create.execute({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    const response = await authenticate.execute({
      email: 'test@johndoe.com',
      password: '123456',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })
  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticate = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    await expect(
      authenticate.execute({
        email: 'test@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticate = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
    const create = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    await create.execute({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    await expect(
      authenticate.execute({
        email: 'test@johndoe.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
