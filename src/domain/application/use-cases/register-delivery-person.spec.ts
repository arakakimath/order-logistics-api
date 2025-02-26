import { InMemoryDeliveryPeopleRepository } from 'test/in-memory-repositories/delivery-people.repository'
import { RegisterDeliveryPersonUseCase } from './register-delivery-person'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

let deliveryPeopleRepository: InMemoryDeliveryPeopleRepository
let fakeHasher: FakeHasher
let sut: RegisterDeliveryPersonUseCase

describe('Register Delivery Person', () => {
  beforeEach(() => {
    deliveryPeopleRepository = new InMemoryDeliveryPeopleRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterDeliveryPersonUseCase(
      deliveryPeopleRepository,
      fakeHasher,
    )
  })

  it('should be able to register a delivery person', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000-01',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isLeft()) throw new Error()
    expect(result.value?.deliveryPerson.id).toBeTruthy()
    expect(result.value?.deliveryPerson.isAdmin()).toBeFalsy()
    expect(deliveryPeopleRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })

  it(`should be able to hash user's password`, async () => {
    const deliveryPerson = makeDeliveryPerson()

    console.log(deliveryPerson.cpf)

    const result = await sut.execute(deliveryPerson)

    const hashedPassword = await fakeHasher.hash(deliveryPerson.password)

    expect(result.isRight()).toBeTruthy()
    expect(deliveryPeopleRepository.items[0].password).toEqual(hashedPassword)
  })
})
