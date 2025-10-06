import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { Pagination, TweetParam, TweetQuery, TweetRequestBody } from '~/models/requests/Tweet.requests'
import { TokenPayLoad } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad

  const result = await tweetsService.createTweet(user_id, req.body)
  return res.json({
    message: TWEETS_MESSAGES.TWEET_CREATED,
    result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  // const { user_id } = req.decoded_authorization as TokenPayLoad
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  console.log('View: ', result)
  const tweet = {
    ...req.tweet,
    user_views: result.user_views,
    guest_views: result.guest_views,
    updated_at: result.updated_at
  }

  // const result = await tweetsService.createTweet(user_id,req.body)
  return res.json({
    message: TWEETS_MESSAGES.GET_TWEET_SUCCESS,
    result: tweet
  })
}

export const getTweetChildrenController = async (req: Request<TweetParam, any, any, TweetQuery>, res: Response) => {
  const tweet_type = Number(req.query.tweet_type)
  const limit = Number(req.query.limit) || 5
  const page = Number(req.query.page) || 1
  const user_id = req.decoded_authorization?.user_id
  if (isNaN(tweet_type)) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.BAD_REQUEST,
      message: TWEETS_MESSAGES.INVALID_TWEET_TYPE
    })
  }

  const { total, tweets } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page,
    user_id
  })
  return res.json({
    message: TWEETS_MESSAGES.GET_TWEET_CHILDREN_SUCCESS,
    result: {
      tweets: tweets,
      tweet_type,
      limit,
      page,
      total_page: Math.ceil(total / limit)
    }
  })
}

export const getNewFeedsController = async (req: Request<ParamsDictionary, any, any, Pagination>, res: Response) => {
  const user_id = req.decoded_authorization?.user_id as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await tweetsService.getNewFeeds({ user_id, limit, page })

  res.json({
    message: 'Get new feeds successfully',
    result
  })
}
