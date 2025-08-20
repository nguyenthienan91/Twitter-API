import express from 'express'
import usersRouter from './routes/users.route'
import databaseService from './services/database.services'
const app = express()

const PORT = 3000

// thêm middleware này để parse JSON
app.use(express.json())
app.use('/users', usersRouter)

databaseService.connect()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
