import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestCreateAppointmentDTO {
  provider: string
  date: Date
}

class CreateAppointmentService {
  public async execute({
    date,
    provider,
  }: RequestCreateAppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const parsedDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      parsedDate,
    )

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: parsedDate,
    })

    await appointmentsRepository.save(appointment)
    return appointment
  }
}

export default CreateAppointmentService
