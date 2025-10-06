import { Router } from 'express'
import { createTweetController, getNewFeedsController, getTweetChildrenController, getTweetController } from '~/controllers/tweets.controllers'
import { audienceValidator, createTweetValidator, getTweetChildrenValidator, paginationValidator, tweetIdValidator } from '~/middlewares/tweets.middlewares'
import {
  accessTokenValidator,
  isUserLoggedInvalidator,
  loginValidator,
  verifiedUserValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

/**
 * Description: create a tweet
 * path: /
 * Method: POST
 * Body: TweetRequestBody
 */
tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

/**
 * Description: get a tweet
 * path: /:tweet_id
 * Method: GET
 * Header: {Authorization?: Bearer access_token}
 */
tweetsRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInvalidator(accessTokenValidator),
  isUserLoggedInvalidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetController)
)

/**
 * Description: get a tweet children
 * path: /:tweet_id/children
 * Method: GET
 * Header: {Authorization?: Bearer access_token}
 * Query: {type?: TweetType, page?: number, limit?: number}
 */
tweetsRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  paginationValidator,
  getTweetChildrenValidator,
  isUserLoggedInvalidator(accessTokenValidator),
  isUserLoggedInvalidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

/**
 * Description: get a new feeds
 * path: /
 * Method: GET
 * Header: {Authorization?: Bearer access_token}
 * Query: {page?: number, limit?: number}
 */
tweetsRouter.get(
  '/',
  paginationValidator,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getNewFeedsController)
)


export default tweetsRouter
