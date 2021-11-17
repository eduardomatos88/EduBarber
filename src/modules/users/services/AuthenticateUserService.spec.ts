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

    await create.execute({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    const response = await authenticate.execute({
      email: 'test@johndoe.com',
      password: '123456',
    })

    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('user')
  })
})
