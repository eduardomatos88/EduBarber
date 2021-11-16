import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICreateUserDTO from '../dtos/ICreateUserDTO'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)
    if (checkUserExists) {
      throw new AppError('Email address already used')
    }
    const hashedPassword = await hash(password, 8)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    return user
  }
}

export default CreateUserService
