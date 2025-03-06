import { InMemoryDeliveryPeopleRepository } from 'test/in-memory-repositories/delivery-people.repository'
import { DeleteDeliveryPersonUseCase } from './delete-delivery-person'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

let deliveryPeopleRepository: InMemoryDeliveryPeopleRepository
let sut: DeleteDeliveryPersonUseCase

describe('Delete Delivery Person', () => {
  beforeEach(() => {
    deliveryPeopleRepository = new InMemoryDeliveryPeopleRepository()

    sut = new DeleteDeliveryPersonUseCase(deliveryPeopleRepository)
  })

  it('should be able to delete a delivery person', async () => {
    const deliveryPerson1 = makeDeliveryPerson({
      name: 'John Doe',
    })

    const deliveryPerson2 = makeDeliveryPerson({
      name: 'John Travolta',
    })

    const deliveryPerson3 = makeDeliveryPerson({
      name: 'John Winchester',
    })

    deliveryPeopleRepository.items.push(
      deliveryPerson1,
      deliveryPerson2,
      deliveryPerson3,
    )

    const { cpf } = deliveryPerson2

    const result = await sut.execute({
      cpf,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isLeft()) throw new Error()
    expect(deliveryPeopleRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'John Doe',
        }),
        expect.objectContaining({
          name: 'John Winchester',
        }),
      ]),
    )
  })
})
