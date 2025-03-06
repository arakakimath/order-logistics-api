import { InMemoryDeliveryPeopleRepository } from 'test/in-memory-repositories/delivery-people.repository'
import { UpdateDeliveryPersonUseCase } from './update-delivery-person'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

let deliveryPeopleRepository: InMemoryDeliveryPeopleRepository
let fakeHasher: FakeHasher
let sut: UpdateDeliveryPersonUseCase

describe('Update Delivery Person', () => {
  beforeEach(() => {
    deliveryPeopleRepository = new InMemoryDeliveryPeopleRepository()
    fakeHasher = new FakeHasher()

    sut = new UpdateDeliveryPersonUseCase(deliveryPeopleRepository, fakeHasher)
  })

  it('should be able to update a delivery person', async () => {
    const deliveryPerson = makeDeliveryPerson()

    deliveryPeopleRepository.items.push(deliveryPerson)

    const name = 'John Doe'
    const password = '123456'
    const admin = true

    const result = await sut.execute({
      name,
      cpf: deliveryPerson.cpf,
      password,
      admin,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isLeft()) throw new Error()
    expect(deliveryPeopleRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        password: '123456-hashed',
        admin: true,
      }),
    )
  })
})
