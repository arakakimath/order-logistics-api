import { config } from 'dotenv'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { randomUUID } from 'node:crypto'

config({ path: '.env.test', override: true })

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const dbName = `test_db_${randomUUID().split('-')[0]}`
  process.env.DATABASE_URL = mongoServer.getUri(dbName)
})

afterAll(async () => {
  await mongoServer.stop()
})
