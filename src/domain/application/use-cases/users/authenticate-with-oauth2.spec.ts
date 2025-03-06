import { InMemoryDeliveryPeopleRepository } from 'test/in-memory-repositories/delivery-people.repository'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { AuthenticateWithOAuth2UseCase } from './authenticate-with-oauth2'
import { FakeTokenService } from 'test/cryptography/fake-token-service'
import { MustBeAuthenticatedToLinkOAuthError } from '../errors/must-be-authenticated-to-link-oauth.error'

let deliveryPeopleRepository: InMemoryDeliveryPeopleRepository
let tokenService: FakeTokenService
let sut: AuthenticateWithOAuth2UseCase

describe('Authenticate with OAuth2', () => {
  beforeEach(() => {
    deliveryPeopleRepository = new InMemoryDeliveryPeopleRepository()
    tokenService = new FakeTokenService()
    sut = new AuthenticateWithOAuth2UseCase(
      deliveryPeopleRepository,
      tokenService,
    )
  })

  it('should be able to link an authenticated delivery person account with an OAuth2 provider', async () => {
    const deliveryPerson = makeDeliveryPerson()

    deliveryPeopleRepository.items.push(deliveryPerson)

    const result = await sut.execute({
      authProvider: 'github',
      authProviderUsername: 'johndoe',
      userID: deliveryPerson.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    )
    expect(deliveryPeopleRepository.items[0].githubUsername).toBeTruthy()
  })

  it('should be able to authenticate a delivery person whose account is already linked with an OAuth2 method', async () => {
    const deliveryPerson = makeDeliveryPerson({ githubUsername: 'johndoe' })

    deliveryPeopleRepository.items.push(deliveryPerson)

    const result = await sut.execute({
      authProvider: 'github',
      authProviderUsername: 'johndoe',
      userID: undefined,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    )
  })

  it('should not be able to link a non-authenticated delivery person account to an OAuth2 provider', async () => {
    const deliveryPerson = makeDeliveryPerson()

    deliveryPeopleRepository.items.push(deliveryPerson)

    const result = await sut.execute({
      authProvider: 'github',
      authProviderUsername: 'johndoe',
      userID: undefined,
    })

    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(MustBeAuthenticatedToLinkOAuthError)
  })
})
