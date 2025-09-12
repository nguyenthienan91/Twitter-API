import { Router } from 'express'
import {
  loginController,
  registerController,
  logoutController,
  verifyEmailController,
  resendVerifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordController,
  resetPasswordController,
  GetProfileController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  validPasswordValidator,
  verifyForgotPasswordTokenValidator
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

/**
 * Description: resend verify email when user cannot see previous email
 * path: /resend-verify-email
 * Method: POST
 * Header: {Authorization Bearer <access_token>}
 * Body: {}
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description: user submit email to reset password
 * path: /forgot-password
 * Method: POST
 * Body: {email: string}
 */
usersRouter.post('/forgot-password', validPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description: verify forgot password token
 * path: /verify-forgot-password
 * Method: POST
 * Body: {forgot_password_token: string}
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

/**
 * Description: reset password
 * path: /reset-password
 * Method: POST
 * Body: {forgot_password_token: string, new_password: string, confirm_new_password: string}
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Description: get profile of logged in user
 * path: /me
 * Method: GET
 * Header: {Authorization Bearer <access_token>}
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(GetProfileController))

export default usersRouter
