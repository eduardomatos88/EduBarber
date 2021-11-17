import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticate: AuthenticateUserService
let create: CreateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    authenticate = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
    create = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })
  it('should be able to authenticate', async () => {
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
    await expect(
      authenticate.execute({
        email: 'test@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to authenticate with wrong password', async () => {
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
