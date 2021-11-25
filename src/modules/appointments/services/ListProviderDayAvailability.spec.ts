import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailability from './ListProviderDayAvailability'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let list: ListProviderDayAvailability

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    list = new ListProviderDayAvailability(fakeAppointmentsRepository)
  })
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 10, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 13, 0, 0),
    })

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 9, 8, 11).getTime())

    const availability = await list.execute({
      provider_id: 'provider',
      day: 8,
      month: 10,
      year: 2021,
    })
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: false },
        { hour: 14, available: true },
        { hour: 15, available: true },
      ]),
    )
  })
})
