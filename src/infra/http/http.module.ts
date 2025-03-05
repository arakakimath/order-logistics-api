import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateUserController } from './controllers/create-user.controller'
import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/register-delivery-person'
import { CryptoModule } from '../cryptography/crypto.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { RefreshTokenController } from './controllers/refresh-token.controller'
import { RefreshTokenUseCase } from '@/domain/application/use-cases/refresh-token'
import { AuthenticateWithGitHubController } from './controllers/authenticate-with-github.controller'
import { EnvModule } from '../env/env.module'
import { HttpModule as AxiosModule } from '@nestjs/axios'
import { GitHubAuthService } from './oauth2/github-auth.service'
import { AuthenticateWithOAuth2UseCase } from '@/domain/application/use-cases/authenticate-with-oauth2'

@Module({
  imports: [DatabaseModule, CryptoModule, EnvModule, AxiosModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    RefreshTokenController,
    AuthenticateWithGitHubController,
  ],
  providers: [
    RegisterDeliveryPersonUseCase,
    AuthenticateUseCase,
    RefreshTokenUseCase,
    GitHubAuthService,
    AuthenticateWithOAuth2UseCase,
  ],
})
export class HTTPModule {}
