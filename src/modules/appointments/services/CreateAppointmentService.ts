import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppError from '@shared/errors/AppError'
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository'

import Appointment from '../infra/typeorm/entities/Appointment'

interface RequestCreateAppointmentDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestCreateAppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const parsedDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      parsedDate,
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: parsedDate,
    })

    await appointmentsRepository.save(appointment)
    return appointment
  }
}

export default CreateAppointmentService
