import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateUserController } from './controllers/users/create-user.controller'
import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/users/register-delivery-person'
import { CryptoModule } from '../cryptography/crypto.module'
import { AuthenticateController } from './controllers/users/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/application/use-cases/users/authenticate'
import { RefreshTokenController } from './controllers/users/refresh-token.controller'
import { RefreshTokenUseCase } from '@/domain/application/use-cases/users/refresh-token'
import { AuthenticateWithGitHubController } from './controllers/users/authenticate-with-github.controller'
import { EnvModule } from '../env/env.module'
import { HttpModule as AxiosModule } from '@nestjs/axios'
import { GitHubAuthService } from './oauth2/github-auth.service'
import { AuthenticateWithOAuth2UseCase } from '@/domain/application/use-cases/users/authenticate-with-oauth2'
import { UpdateDeliveryPersonUseCase } from '@/domain/application/use-cases/users/update-delivery-person'
import { UpdateUserController } from './controllers/users/update-user.controller'
import { GetDeliveryPersonUseCase } from '@/domain/application/use-cases/users/get-delivery-person'
import { DeleteDeliveryPersonUseCase } from '@/domain/application/use-cases/users/delete-delivery-person'
import { GetUserController } from './controllers/users/get-user.controller'
import { DeleteUserController } from './controllers/users/delete-user.controller'
import { CreateOrderController } from './controllers/orders/create-order.controller'
import { CreateOrderUseCase } from '@/domain/application/use-cases/orders/create-order'

@Module({
  imports: [DatabaseModule, CryptoModule, EnvModule, AxiosModule],
  controllers: [
    CreateUserController,
    UpdateUserController,
    GetUserController,
    DeleteUserController,
    AuthenticateController,
    RefreshTokenController,
    AuthenticateWithGitHubController,
    // orders
    CreateOrderController,
  ],
  providers: [
    // users
    RegisterDeliveryPersonUseCase,
    AuthenticateUseCase,
    RefreshTokenUseCase,
    AuthenticateWithOAuth2UseCase,
    UpdateDeliveryPersonUseCase,
    GetDeliveryPersonUseCase,
    DeleteDeliveryPersonUseCase,
    // orders
    CreateOrderUseCase,
    GitHubAuthService,
  ],
})
export class HTTPModule {}
