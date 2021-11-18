import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let show: ShowProfileService

describe('showUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    show = new ShowProfileService(fakeUsersRepository)
  })
  it('should be able to show the profile user', async () => {
    const profile = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })

    await show.execute({
      user_id: profile.id,
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('test@johndoe.com')
  })
  it('should not be able to show profile from a non-existing user', async () => {
    await expect(
      show.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
