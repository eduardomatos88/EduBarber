import { Router } from 'express'
import { v4 } from 'uuid'
import { startOfHour, isEqual, parseISO } from 'date-fns'

interface Appointment {
  id: string
  provider: string
  date: Date
}

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

  const appointment = {
    id: v4(),
    provider,
    date: parsedDate,
  }

  appointments.push(appointment)
  return res.json(appointment)
})

export default appointmentsRouter
