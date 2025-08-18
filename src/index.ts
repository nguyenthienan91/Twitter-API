import express from 'express'
import usersRouter from './routes/users.route'
const app = express()

const PORT = 3000

// thêm middleware này để parse JSON
app.use(express.json())

app.use('/users', usersRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
