import AppError from '@shared/errors/AppError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository()
    const create = new CreateAppointmentService(fakeAppointmentRepository)

    const provider_id = '123123123'

    const appointment = await create.execute({
      provider_id,
      date: new Date(),
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment).toHaveProperty('date')
    expect(appointment.provider_id).toBe(provider_id)
  })
  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository()
    const create = new CreateAppointmentService(fakeAppointmentRepository)

    const provider_id = '123123123'

    const appointmentDate = new Date(2021, 4, 10, 11)

    await create.execute({
      provider_id,
      date: appointmentDate,
    })
    expect(
      create.execute({
        provider_id,
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
