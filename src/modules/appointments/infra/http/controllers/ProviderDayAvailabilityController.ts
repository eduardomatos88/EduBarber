import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability'

class ProvidersDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params
    const { month, year, day } = req.body

    const list = container.resolve(ListProviderDayAvailability)
    const appointments = await list.execute({
      month,
      provider_id,
      year,
      day,
    })
    return res.json(appointments)
  }
}

export default ProvidersDayAvailabilityController
