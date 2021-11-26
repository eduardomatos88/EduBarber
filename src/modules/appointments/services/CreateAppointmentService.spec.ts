import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository'
import AppError from '@shared/errors/AppError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentRepository: FakeAppointmentsRepository
let fakeNotificationRepository: FakeNotificationRepository
let create: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    fakeNotificationRepository = new FakeNotificationRepository()
    create = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
    )
  })
  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 9, 15, 12).getTime())

    const provider_id = '123123123'
    const user_id = '321321321'
    const appointment = await create.execute({
      provider_id,
      user_id,
      date: new Date(2021, 9, 15, 13),
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment).toHaveProperty('date')
    expect(appointment.provider_id).toBe(provider_id)
    expect(appointment.user_id).toBe(user_id)
  })
  it('should not be able to create two appointments on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 9, 15, 10).getTime())

    const provider_id = '123123123'
    const user_id = '321321321'
    const appointmentDate = new Date(2021, 9, 15, 11)
    await create.execute({
      provider_id,
      user_id,
      date: appointmentDate,
    })

    await expect(
      create.execute({
        provider_id,
        user_id,
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to create an appointment on a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 9, 15, 12).getTime())

    await expect(
      create.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2020, 9, 15, 11),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to create an appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 9, 15, 12).getTime())

    await expect(
      create.execute({
        provider_id: 'provider',
        user_id: 'provider',
        date: new Date(2020, 9, 15, 13),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 9, 15, 12).getTime())

    await expect(
      create.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2021, 9, 15, 18),
      }),
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      create.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2021, 9, 16, 7),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
