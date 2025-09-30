import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { BookmarkRequestBody } from '~/models/requests/Bookmark.requests'
import { TokenPayLoad } from '~/models/requests/User.requests'
import bookMarkService from '~/services/bookmarks.services'

export const bookMarksController = async (req: Request<ParamsDictionary, any, BookmarkRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad

  const result = await bookMarkService.bookMarkTweet(user_id, req.body.tweet_id)
  return res.json({
    message: TWEETS_MESSAGES.BOOKMARK_TWEET_SUCCESSFULLY,
    result
  })
}

export const unBookMarksController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad

  const result = await bookMarkService.unBookMarkTweet(user_id, req.params.tweet_id)
  return res.json({
    message: TWEETS_MESSAGES.UNBOOKMARK_TWEET_SUCCESSFULLY,
    result
  })
}
