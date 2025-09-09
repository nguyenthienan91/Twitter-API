import { Router } from 'express'
import {
  loginController,
  registerController,
  logoutController,
  verifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { validate } from '~/utils/validation'
const usersRouter = Router()

//middleware
usersRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

/**
 * Description: Login a user
 * path: /login
 * Method: POST
 * Body: {email: string, password: string}
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: Register a new user
 * path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, confirmed_password: string, date_of_birth: ISO8601 }
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Logout a user
 * path: /logout
 * Method: POST
 * Header: {Authorization Bearer <access_token>}
 * Body: {refresh_token: string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: verify email when user clicks the link in the email
 * path: /verify-email
 * Method: POST
 * Body: {email_verify_token: string}
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))
export default usersRouter
