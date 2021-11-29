import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability'

class ProvidersDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params
    const { month, year, day } = req.query

    const list = container.resolve(ListProviderDayAvailability)
    const appointments = await list.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    })
    return res.json(appointments)
  }
}

export default ProvidersDayAvailabilityController
