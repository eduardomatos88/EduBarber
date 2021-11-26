import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProvidersDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProvidersMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProvidersController from '../controllers/ProvidersController'

const providersRouter = Router()
const providersControllers = new ProvidersController()
const providersMonthAvailabilityController =
  new ProvidersMonthAvailabilityController()
const providersDayAvailabilityController =
  new ProvidersDayAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersControllers.index)
providersRouter.get(
  '/:provider_id/month-availability',
  providersMonthAvailabilityController.index,
)
providersRouter.get(
  '/:provider_id/day-availability',
  providersDayAvailabilityController.index,
)
export default providersRouter
