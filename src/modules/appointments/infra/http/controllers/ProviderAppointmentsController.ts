import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id
    const { day, month, year } = req.query

    const list = container.resolve(ListProviderAppointmentsService)
    const appointments = await list.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    })
    return res.json(appointments)
  }
}

export default ProviderAppointmentsController
