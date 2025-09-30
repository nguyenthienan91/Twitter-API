import { Router } from 'express'
import { bookMarksController, unBookMarksController } from '~/controllers/bookmarks.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const bookMarksRouter = Router()

/**
 * Description: create a bookmark
 * path: /
 * Method: POST
 * Body: {tweet_id: string}
 * Header: {Authorization Bearer <access_token>}
 */

bookMarksRouter.post('', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(bookMarksController))

/**
 * Description: delete a bookmark
 * path: /
 * Method: DELETE
 * Body: {tweet_id: string}
 * Header: {Authorization Bearer <access_token>}
 */

bookMarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unBookMarksController)
)

export default bookMarksRouter
