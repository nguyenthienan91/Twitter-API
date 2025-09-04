import { error } from 'console'
import { Request, Response, NextFunction } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  // throw new Error('Test Error')
  const result = await userService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw new Error('Test Error')
    const result = await userService.register(req.body)
    return res.status(201).json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      result: {
        access_token: result.access_token,
        refresh_token: result.refresh_token
      }
      // userId: result.insertedId
    })
  } catch (error: any) {
    console.error('❌ Register error:', error)
    next(error)
    // return res.status(400).json({
    //   error: 'Register failed',
    //   details: error.message
    // })
  }
}
