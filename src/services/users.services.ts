import User from '~/models/schemas/User.schema'
import databaseService from './database.services'

class UsersService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    const res = await databaseService.users.insertOne(
      new User({
        email,
        password
      })
    )
    return res
  }

  async checkEmailExist(email: string) {
    const user = databaseService.users.findOne({ email })
    console.log(user)
    return Boolean(user)
  }
}

const userService = new UsersService()
export default userService
