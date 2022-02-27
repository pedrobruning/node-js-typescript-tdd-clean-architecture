import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
    this.client.db()
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getConnection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
