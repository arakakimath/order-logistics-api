import { config } from 'dotenv'

config({ path: '.jwt.env', override: true })
config({ path: '.env', override: true })
config({ path: '.env.test', override: true })
