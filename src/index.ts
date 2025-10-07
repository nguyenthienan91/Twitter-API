import express from 'express'
import usersRouter from './routes/users.route'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from './constants/directory'
import staticRouter from './routes/static.routes'
import cors from 'cors'
import { loadEnvConfig } from './utils/config'
import { MongoClient } from 'mongodb'
import tweetsRouter from './routes/tweets.routes'
import bookMarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'

// import './utils/fakeData'   //dùng để fake dữ liệu mongodb

loadEnvConfig()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
const app = express()
const PORT = process.env.PORT || 4000
app.use(cors())
// Tạo folder upload nếu chưa tồn tại
initFolder()
// Xử lí serving static file
// app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

// thêm middleware này để parse JSON
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookMarksRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)

app.use(defaultErrorHandler) //default handler
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// const mongoclient = new MongoClient(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
// @twitter.6gg1jz7.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`)

// const db = mongoclient.db('student')
// const users = db.collection('users')
// const usersData = []
// function getRandomNumber() {
//   return Math.floor(Math.random() * 100) + 1
// }
// for (let i = 0; i < 1000; i++) {
//   usersData.push({
//     name: 'user' + (i + 1),
//     age: getRandomNumber(),
//     gender: i % 2 === 0 ? 'male' : 'female'
//   })
// }
// users.insertMany(usersData)
