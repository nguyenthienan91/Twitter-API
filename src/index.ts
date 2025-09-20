import express from 'express'
import usersRouter from './routes/users.route'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.route'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from './constants/directory'
import staticRouter from './routes/static.routes'

config()

databaseService.connect()
const app = express()
const PORT = process.env.PORT || 4000

// Tạo folder upload nếu chưa tồn tại
initFolder()
// Xử lí serving static file
// app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

// thêm middleware này để parse JSON
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)

app.use(defaultErrorHandler) //default handler
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
