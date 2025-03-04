import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { FakeTokenService } from 'test/cryptography/fake-token-service'
import { RefreshTokenUseCase } from './refresh-token'

let fakeTokenService: FakeTokenService
let sut: RefreshTokenUseCase

describe('Refresh Token', () => {
  beforeEach(() => {
    fakeTokenService = new FakeTokenService()

    sut = new RefreshTokenUseCase(fakeTokenService)
  })

  it('should be able to refresh token', async () => {
    const refreshToken = JSON.stringify({ sub: 'user-id', role: 'admin' })

    const result = await sut.execute({
      refreshToken,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    )
  })
})
