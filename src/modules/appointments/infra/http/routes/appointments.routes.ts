import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsControllers = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (req, res) => {
//   const { id } = req.user
//   const appointments = await appointmentsRepository.find({ where: { id } })
//   return res.json(appointments)
// })

appointmentsRouter.post('/', appointmentsControllers.create)

export default appointmentsRouter
