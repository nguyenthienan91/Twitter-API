import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { LikeRequestBody } from '~/models/requests/Like.requests'
import { TokenPayLoad } from '~/models/requests/User.requests'
import likeService from '~/services/likes.services'

export const likeController = async (req: Request<ParamsDictionary, any, LikeRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const result = await likeService.likeTweet(user_id, req.body.tweet_id)
  return res.json({
    message: TWEETS_MESSAGES.LIKE_TWEET_SUCCESSFULLY,
    result
  })
}

export const unLikeController = async (req: Request<ParamsDictionary, any, LikeRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const result = await likeService.unLikeTweet(user_id, req.params.tweet_id)
  return res.json({
    message: TWEETS_MESSAGES.UNLIKE_TWEET_SUCCESSFULLY,
    result
  })
}
