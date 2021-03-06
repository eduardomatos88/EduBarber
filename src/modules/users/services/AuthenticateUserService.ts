import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import authConfig from '@config/auth'

import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequestAuthenticate {
  email: string
  password: string
}

interface IResponseAuthenticate {
  user: User
  token: string
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async execute({
    email,
    password,
  }: IRequestAuthenticate): Promise<IResponseAuthenticate> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    )
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ user: user.name }, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}
export default AuthenticateUserService
