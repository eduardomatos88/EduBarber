import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailability from './ListProviderMonthAvailability'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let list: ListProviderMonthAvailability

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    list = new ListProviderMonthAvailability(fakeAppointmentsRepository)
  })
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 9, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 10, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 11, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 12, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 13, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 14, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 15, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 16, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 17, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 9, 8, 0, 0),
    })

    const availability = await list.execute({
      provider_id: 'provider',
      month: 10,
      year: 2021,
    })
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 8, available: false },
        { day: 9, available: true },
        { day: 10, available: true },
        { day: 11, available: true },
      ]),
    )
  })
})
