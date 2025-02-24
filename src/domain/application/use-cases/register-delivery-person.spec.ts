import { InMemoryDeliveryPersonRepository } from 'test/in-memory-repositories/delivery-person.repository'
import { RegisterDeliveryPersonUseCase } from './register-delivery-person'

let deliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: RegisterDeliveryPersonUseCase

describe('Register Delivery Person', () => {
  beforeEach(() => {
    deliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new RegisterDeliveryPersonUseCase(deliveryPersonRepository)
  })

  it('should be able to register a delivery person', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000-01',
      password: '123456',
    })

    expect(result.isRight).toBeTruthy()
    expect(result.value?.deliveryPerson.id).toBeTruthy()
    expect(result.value?.deliveryPerson.isAdmin()).toBeFalsy()
    expect(deliveryPersonRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })
})
