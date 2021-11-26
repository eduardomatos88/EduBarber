import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let list: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    list = new ListProviderAppointmentsService(fakeAppointmentsRepository)
  })
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 8, 0, 0),
    })
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 9, 8, 10, 0, 0),
    })

    const appointments = await list.execute({
      provider_id: 'provider',
      day: 8,
      month: 10,
      year: 2021,
    })
    expect(appointments).toEqual([appointment1, appointment2])
  })
})
