import { Router } from 'express'
import AppError from '@shared/errors/AppError'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    const authenticateUser = new AuthenticateUserService()
    const { user, token } = await authenticateUser.execute({ email, password })

    return res.json({ user, token })
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message })
    }
    return res.json({ error: 'Server error' })
  }
})

export default sessionsRouter
