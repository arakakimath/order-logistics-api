import { RegisterDeliveryPersonUseCase } from './register-delivery-person'

let sut: RegisterDeliveryPersonUseCase

describe('Register Delivery Person', () => {
  beforeEach(() => {
    sut = new RegisterDeliveryPersonUseCase()
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
  })
})
