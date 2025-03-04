import { InMemoryDeliveryPeopleRepository } from 'test/in-memory-repositories/delivery-people.repository'
import { AuthenticateUseCase } from './authenticate'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { FakeTokenService } from 'test/cryptography/fake-token-service'

let deliveryPeopleRepository: InMemoryDeliveryPeopleRepository
let fakeHasher: FakeHasher
let fakeTokenService: FakeTokenService
let sut: AuthenticateUseCase

describe('Register Delivery Person', () => {
  beforeEach(() => {
    deliveryPeopleRepository = new InMemoryDeliveryPeopleRepository()
    fakeHasher = new FakeHasher()
    fakeTokenService = new FakeTokenService()

    sut = new AuthenticateUseCase(
      deliveryPeopleRepository,
      fakeHasher,
      fakeTokenService,
    )
  })

  it('should be able to authenticate a delivery person', async () => {
    const deliveryPerson = makeDeliveryPerson({
      password: await fakeHasher.hash('123456'),
    })

    deliveryPeopleRepository.items.push(deliveryPerson)

    const result = await sut.execute({
      cpf: deliveryPerson.cpf,
      password: '123456',
    })
    console.log(result.value)
    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    )
  })
})
