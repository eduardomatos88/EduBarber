import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let list: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    list = new ListProvidersService(fakeUsersRepository)
  })
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    const user2 = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'test@johndue.com',
      password: '123456',
    })
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Dae',
      email: 'test@johndae.com',
      password: '123456',
    })

    const providers = await list.execute({ user_id: loggedUser.id })
    expect(providers).toEqual([user1, user2])
  })
})
