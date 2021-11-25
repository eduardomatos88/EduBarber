import path from 'path'
import { inject, injectable } from 'tsyringe'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: '[EduBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://127.0.0.1:3000/reset_password?token=${token}`,
        },
      },
    })
  }
}

export default SendForgotPasswordEmailService