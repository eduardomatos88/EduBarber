import { compare } from 'bcryptjs'
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../config/auth'

interface RequestAuthenticate {
  email: string
  password: string
}

interface ResponseAuthenticate {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestAuthenticate): Promise<ResponseAuthenticate> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({ where: { email } })
    if (!user) {
      throw new Error('Incorrect email/password combination')
    }
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
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
