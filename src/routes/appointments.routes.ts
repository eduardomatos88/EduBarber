import { Router } from 'express'
import { startOfHour, isEqual, parseISO } from 'date-fns'
import Appointment from '../models/Appointment'

const appointmentsRouter = Router()

const appointments: Appointment[] = []

appointmentsRouter.get('/', (req, res) => res.json({ ok: true }))

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body

  const parsedDate = startOfHour(parseISO(date))

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  )

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' })
  }

  const appointment = new Appointment(provider, parsedDate)

  appointments.push(appointment)
  return res.json(appointment)
})

export default appointmentsRouter
