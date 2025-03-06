import { InMemoryDeliveryPeopleRepository } from 'test/in-memory-repositories/delivery-people.repository'
import { GetDeliveryPersonUseCase } from './get-delivery-person'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

let deliveryPeopleRepository: InMemoryDeliveryPeopleRepository
let sut: GetDeliveryPersonUseCase

describe('Get Delivery Person', () => {
  beforeEach(() => {
    deliveryPeopleRepository = new InMemoryDeliveryPeopleRepository()

    sut = new GetDeliveryPersonUseCase(deliveryPeopleRepository)
  })

  it('should be able to get a delivery person', async () => {
    const deliveryPerson = makeDeliveryPerson({
      name: 'John Doe',
      password: '123456',
      admin: true,
    })

    deliveryPeopleRepository.items.push(deliveryPerson)

    const { cpf } = deliveryPerson

    const result = await sut.execute({
      cpf,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isLeft()) throw new Error()
    expect(result.value.deliveryPerson).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        password: '123456',
        admin: true,
      }),
    )
  })
})
