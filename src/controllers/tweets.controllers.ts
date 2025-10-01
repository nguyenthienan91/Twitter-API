import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import { TokenPayLoad } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad

  const result = await tweetsService.createTweet(user_id,req.body)
  return res.json({
    message: TWEETS_MESSAGES.TWEET_CREATED,
    result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  // const { user_id } = req.decoded_authorization as TokenPayLoad

  // const result = await tweetsService.createTweet(user_id,req.body)
  return res.json({
    message: TWEETS_MESSAGES.GET_TWEET_SUCCESS,
    result: 'ok'
  })
}
