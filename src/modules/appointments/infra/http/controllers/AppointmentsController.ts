import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import AppError from '@shared/errors/AppError'

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { provider_id, date } = req.body
      const parsedDate = parseISO(date)

      const createAppointment = container.resolve(CreateAppointmentService)
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
  }
}

export default AppointmentsController
