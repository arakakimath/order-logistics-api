import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HTTPModule } from './http/http.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { EnvService } from './infra/env/env.service'
import { EnvModule } from './infra/env/env.module'

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
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HTTPModule,
  ],
  providers: [EnvService],
})
export class AppModule {}
