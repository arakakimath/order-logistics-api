import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateUserController } from './controllers/create-user.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
})
export class HTTPModule {}
