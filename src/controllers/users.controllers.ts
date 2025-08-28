import { error } from 'console'
import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

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

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)

    return res.status(201).json({
      message: 'Register Success',
      result: {
        access_token: result.access_token,
        refresh_token: result.refresh_token
      }
      // userId: result.insertedId
    })
  } catch (error: any) {
    console.error('❌ Register error:', error)
    return res.status(400).json({
      error: 'Register failed',
      details: error.message
    })
  }
}
