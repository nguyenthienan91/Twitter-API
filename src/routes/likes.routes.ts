import { Router } from 'express'
import { likeController, unLikeController } from '~/controllers/likes.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likesRouter = Router()

/**
 * Description: create a like status
 * path: /
 * Method: POST
 * Body: {tweet_id: string}
 * Header: {Authorization Bearer <access_token>}
 */

likesRouter.post('', accessTokenValidator, verifiedUserValidator, tweetIdValidator, wrapRequestHandler(likeController))

/**
 * Description: delete a like
 * path: /tweets/:tweet_id
 * Method: DELETE
 * params: {tweet_id: string}
 * Header: {Authorization Bearer <access_token>}
 */

likesRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unLikeController)
)

export default likesRouter
