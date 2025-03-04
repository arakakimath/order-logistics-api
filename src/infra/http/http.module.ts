import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateUserController } from './controllers/create-user.controller'
import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/register-delivery-person'
import { CryptoModule } from '../cryptography/crypto.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { RefreshTokenController } from './controllers/refresh-token.controller'
import { RefreshTokenUseCase } from '@/domain/application/use-cases/refresh-token'

@Module({
  imports: [DatabaseModule, CryptoModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    RefreshTokenController,
  ],
  providers: [
    RegisterDeliveryPersonUseCase,
    AuthenticateUseCase,
    RefreshTokenUseCase,
  ],
})
export class HTTPModule {}
