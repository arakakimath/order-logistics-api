import { Either, left, right } from '@/core/either'
import { DeliveryPeopleRepository } from '../../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { TokenService } from '../../cryptography/token-service'
import { OAuthMethodAlreadyUsedError } from '../errors/oauth-method-already-used.error'
import { MustBeAuthenticatedToLinkOAuthError } from '../errors/must-be-authenticated-to-link-oauth.error'

interface AuthenticateWithOAuth2UseCaseRequest {
  authProvider: 'github'
  authProviderUsername: string
  userID?: string
}

type AuthenticateWithOAuth2UseCaseResponse = Either<
  OAuthMethodAlreadyUsedError | MustBeAuthenticatedToLinkOAuthError,
  {
    accessToken: string
    refreshToken: string
  }
>

@Injectable()
export class AuthenticateWithOAuth2UseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
    private tokenservice: TokenService,
  ) { }

  async execute({
    authProvider,
    authProviderUsername,
    userID,
  }: AuthenticateWithOAuth2UseCaseRequest): Promise<AuthenticateWithOAuth2UseCaseResponse> {
    const usernameProps = `${authProvider.toLowerCase()}Username`

    let deliveryPerson =
      await this.deliveryPeopleRepository.findByGitHubUsername(
        authProviderUsername,
      )

    if (deliveryPerson?.id.toString() !== userID && userID && deliveryPerson)
      return left(new OAuthMethodAlreadyUsedError())

    if (!deliveryPerson) {
      if (!userID) return left(new MustBeAuthenticatedToLinkOAuthError())

      deliveryPerson = await this.deliveryPeopleRepository.findByID(userID)

      deliveryPerson[usernameProps] = authProviderUsername

      await this.deliveryPeopleRepository.save(deliveryPerson)
    }

    const payload = {
      sub: deliveryPerson.id.toString(),
      role: deliveryPerson.isAdmin() ? 'admin' : 'regular',
    }

    const accessToken = await this.tokenservice.sign(payload)
    const refreshToken = await this.tokenservice.sign(payload, '1d')

    return right({ accessToken, refreshToken })
  }
}
