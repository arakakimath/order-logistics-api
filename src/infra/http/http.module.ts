import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateUserController } from './controllers/create-user.controller'
import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/register-delivery-person'
import { CryptoModule } from '../cryptography/crypto.module'
import { AuthenticateController } from './controllers/authenticate.controller'

@Module({
  imports: [DatabaseModule, CryptoModule],
  controllers: [CreateUserController, AuthenticateController],
  providers: [RegisterDeliveryPersonUseCase],
})
export class HTTPModule {}
