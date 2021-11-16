import { Router } from 'express'
import { parseISO } from 'date-fns'

import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppError from '@shared/errors/AppError'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {
  const { id } = req.user
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find({ where: { id } })
  return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body
    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    })

    return res.json(appointment)
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(400).json({ error: err.message })
    }
    return res.json({ error: 'Server error' })
  }
})

export default appointmentsRouter
