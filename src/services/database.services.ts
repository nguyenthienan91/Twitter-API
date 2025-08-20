import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
config()
// console.log(process.env.DB_USERNAME)
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
@twitter.6gg1jz7.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

class DatabaseService {
  private client: MongoClient
  private db: Db | null = null

  constructor() {
    this.client = new MongoClient(uri)
    // this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    if (!this.db) {
      await this.client.connect()
      this.db = this.client.db(process.env.DB_NAME)
      console.log('Connected to MongoDB')
    }
    // try {
    //   // Send a ping to confirm a successful connection
    //   await this.db.command({ ping: 1 })
    //   console.log('Pinged your deployment. You successfully connected to MongoDB!')
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await this.client.close()
    // }
  }

  get users(): Collection<User> {
    if (!this.db) {
      throw new Error('Database not connected.Call connect() first.')
    }
    return this.db.collection(process.env.DB_USER_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
