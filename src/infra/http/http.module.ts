import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateUserController } from './controllers/create-user.controller'
import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/register-delivery-person'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [RegisterDeliveryPersonUseCase],
})
export class HTTPModule {}
