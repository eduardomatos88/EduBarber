import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const create = new CreateUserService()

    const user = await create.execute({ name, email, password })
    return res.json(user)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message })
    }
    return res.json({ error: 'Server error' })
  }
})

export default usersRouter
