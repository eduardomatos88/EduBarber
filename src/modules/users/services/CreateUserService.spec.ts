import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashRepository: FakeHashProvider
let create: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashRepository = new FakeHashProvider()
    create = new CreateUserService(fakeUsersRepository, fakeHashRepository)
  })
  it('should be able to create a new user', async () => {
    const user = await create.execute({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })
  it('should not be able to create two users with same email from another', async () => {
    await create.execute({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await expect(
      create.execute({
        name: 'John Doe 2',
        email: 'test@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
