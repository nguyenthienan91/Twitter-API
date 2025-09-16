import express from 'express'
import usersRouter from './routes/users.route'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.route'
import { initFolder } from './utils/file'
import { config } from 'dotenv'

config()

databaseService.connect()
const app = express()
const PORT = process.env.PORT || 4000


// Tạo folder upload nếu chưa tồn tại
initFolder()

// thêm middleware này để parse JSON
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use(defaultErrorHandler) //default handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
