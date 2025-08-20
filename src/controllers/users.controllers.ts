import { error } from 'console'
import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'nguyenthienan@gmail.com' && password === '91') {
    res.json({
      message: 'Login Successfully'
    })
  } else {
    res.status(400).json({
      error: 'Login failed'
    })
  }
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await userService.register({ email, password })

    return res.status(201).json({
      message: 'Register Success',
      userId: result.insertedId
    })
  } catch (error: any) {
    console.error('❌ Register error:', error)
    return res.status(400).json({
      error: 'Register failed',
      details: error.message
    })
  }
}
