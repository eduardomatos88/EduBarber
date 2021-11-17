import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUsersTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUsersTokensRepository: FakeUsersTokensRepository
let resetPasswordService: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUsersTokensRepository = new FakeUsersTokensRepository()
    fakeHashProvider = new FakeHashProvider()
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider,
    )
  })
  it('should be able to reset password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    const { token } = await fakeUsersTokensRepository.generate(user.id)
    await resetPasswordService.execute({
      password: '123123',
      token,
    })
    const updatedUser = await fakeUsersRepository.findByID(user.id)

    expect(generateHash).toBeCalledWith('123123')
    expect(updatedUser?.password).toBe('123123')
  })
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokensRepository.generate(
      'non-existing-user',
    )
    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    const { token } = await fakeUsersTokensRepository.generate(user.id)
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })
    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
