import express from 'express'
import usersRouter from './routes/users.route'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

databaseService.connect()
const app = express()
const PORT = 4000

// thêm middleware này để parse JSON
app.use(express.json())
app.use('/users', usersRouter)
app.use(defaultErrorHandler) //default handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
