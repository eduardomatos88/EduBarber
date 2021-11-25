import { container } from 'tsyringe'

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import '@modules/users/providers'
import './providers'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<UserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)