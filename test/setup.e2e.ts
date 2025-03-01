import { config } from 'dotenv'
import { MongoMemoryServer } from 'mongodb-memory-server'

config({ path: '.jwt.env', override: true })
config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const dbName = `test_db_${Date.now()}`
  process.env.DATABASE_URL = mongoServer.getUri(dbName)
})

afterAll(async () => {
  await mongoServer.stop()
})
