import { TokenPayLoad } from './models/requests/User.requests'
import Tweet from './models/schemas/Tweet.schema'
import User from './models/schemas/User.schema'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayLoad
    decoded_refresh_token?: TokenPayLoad
    decoded_email_verify_token?: TokenPayLoad
    decoded_forgot_password_token?: TokenPayLoad
    tweet?: Tweet
  }
}
