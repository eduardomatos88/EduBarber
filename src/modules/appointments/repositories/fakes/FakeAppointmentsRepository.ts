import { isEqual } from 'date-fns'
import { v4 } from 'uuid'

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    )
    return findAppointment
  }
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = new Appointment()
    Object.assign(appointments, {
      id: v4(),
      date,
      provider_id,
    })
    this.appointments.push(appointments)
    return appointments
  }
}

export default FakeAppointmentsRepository
