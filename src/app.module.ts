import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HTTPModule } from './infra/http/http.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { EnvService } from './infra/env/env.service'
import { EnvModule } from './infra/env/env.module'
import { AuthModule } from './infra/auth/auth.module'
import { CryptoModule } from './infra/cryptography/crypto.module'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory(env: EnvService) {
        const databaseURL = env.get('DATABASE_URL')

        return {
          uri: databaseURL,
        }
      },
    }),
    ConfigModule.forRoot({
      validate: (env) => {
        if (process.env.NODE_ENV !== 'test') {
          return envSchema.parse(env)
        }
        return process.env
      },
      isGlobal: true,
    }),
    HTTPModule,
    AuthModule,
    CryptoModule,
  ],
  providers: [EnvService],
})
export class AppModule {}
