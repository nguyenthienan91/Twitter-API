import BookMark from '~/models/schemas/Bookmark.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class BookMarkService {
  async bookMarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.bookmarks.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      { $setOnInsert: new BookMark({ user_id: new ObjectId(user_id), tweet_id: new ObjectId(tweet_id) }) },
      { upsert: true, returnDocument: 'after' }
    )

    return result
  }

  async unBookMarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.bookmarks.findOneAndDelete({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return result
  }
}

const bookMarkService = new BookMarkService()
export default bookMarkService
