import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUsersTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUsersTokensRepository: FakeUsersTokensRepository
let sendForgotPasswordEmailService: SendForgotPasswordEmailService

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUsersTokensRepository = new FakeUsersTokensRepository()
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokensRepository,
    )
  })
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    await sendForgotPasswordEmailService.execute({
      email: 'test@johndoe.com',
    })
    expect(sendMail).toBeCalled()
  })
  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'test@johndoe.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate')
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@johndoe.com',
      password: '123456',
    })
    await sendForgotPasswordEmailService.execute({
      email: 'test@johndoe.com',
    })

    expect(generateToken).toBeCalledWith(user.id)
  })
})
