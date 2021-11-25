import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO'

import ICreateUserDTO from '../dtos/ICreateUserDTO'
import User from '../infra/typeorm/entities/User'

interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  findByID(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}

export default IUsersRepository
