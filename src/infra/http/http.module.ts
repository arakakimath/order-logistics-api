import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateUserController } from './controllers/create-user.controller'
import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/users/register-delivery-person'
import { CryptoModule } from '../cryptography/crypto.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/application/use-cases/users/authenticate'
import { RefreshTokenController } from './controllers/refresh-token.controller'
import { RefreshTokenUseCase } from '@/domain/application/use-cases/users/refresh-token'
import { AuthenticateWithGitHubController } from './controllers/authenticate-with-github.controller'
import { EnvModule } from '../env/env.module'
import { HttpModule as AxiosModule } from '@nestjs/axios'
import { GitHubAuthService } from './oauth2/github-auth.service'
import { AuthenticateWithOAuth2UseCase } from '@/domain/application/use-cases/users/authenticate-with-oauth2'
import { UpdateDeliveryPersonUseCase } from '@/domain/application/use-cases/users/update-delivery-person'
import { UpdateUserController } from './controllers/update-user.controller'
import { GetDeliveryPersonUseCase } from '@/domain/application/use-cases/users/get-delivery-person'
import { DeleteDeliveryPersonUseCase } from '@/domain/application/use-cases/users/delete-delivery-person'
import { GetUserController } from './controllers/get-user.controller'
import { DeleteUserController } from './controllers/delete-user.controller'

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
  ],
  providers: [
    RegisterDeliveryPersonUseCase,
    AuthenticateUseCase,
    RefreshTokenUseCase,
    AuthenticateWithOAuth2UseCase,
    UpdateDeliveryPersonUseCase,
    GetDeliveryPersonUseCase,
    DeleteDeliveryPersonUseCase,
    GitHubAuthService,
  ],
})
export class HTTPModule {}
