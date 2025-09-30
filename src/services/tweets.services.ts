import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import databaseService from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId, WithId } from 'mongodb'
import HashTag from '~/models/schemas/Hashtag.schema'

class TweetsService {
  async checkAnhCreateHashTags(hashtags: string[]) {
    const hashtagDocuments = await Promise.all(
      hashtags.map((hashtag) => {
        // tìm trong db nếu có thì lấy, không thì tạo mới
        return databaseService.hashtags.findOneAndUpdate(
          { name: hashtag },
          { $setOnInsert: new HashTag({ name: hashtag }) },
          { upsert: true, returnDocument: 'after' }
        )
      })
    )
    return hashtagDocuments.map((document) => {
      // Kiểm tra null
      if (!document) {
        throw new Error('Failed to create hashtag')
      }
      // Kiểm tra và ép kiểu cho document
      const hashtag = document as WithId<HashTag>
      return hashtag._id
    })
  }

  async createTweet(user_id: string, body: TweetRequestBody) {
    const hashTags = await this.checkAnhCreateHashTags(body.hashtags)
    // console.log('Hashtags: ', hashTags)
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: body.audience,
        content: body.content,
        hashtags: hashTags,
        mentions: body.mentions,
        medias: body.medias,
        parent_id: body.parent_id,
        type: body.type,
        user_id: new ObjectId(user_id)
      })
    )
    const tweet = await databaseService.tweets.findOne({ _id: result.insertedId })
    return tweet
  }
}

const tweetsService = new TweetsService()
export default tweetsService
