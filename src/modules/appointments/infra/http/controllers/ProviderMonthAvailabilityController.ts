import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailability'

class ProvidersMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params
    const { month, year } = req.body

    const list = container.resolve(ListProviderMonthAvailability)
    const appointments = await list.execute({ month, provider_id, year })
    return res.json(appointments)
  }
}

export default ProvidersMonthAvailabilityController
