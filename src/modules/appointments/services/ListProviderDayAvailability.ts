import { getHours, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}
  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
      })
    const hourStart = 8

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    )
    const currentDate = new Date(Date.now())

    const availability = eachHourArray.map(hour => {
      const harAppointmentHour = appointments.filter(
        appointment => getHours(appointment.date) === hour,
      )
      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available:
          harAppointmentHour.length === 0 && isAfter(compareDate, currentDate),
      }
    })
    return availability
  }
}

export default ListProviderDayAvailability
