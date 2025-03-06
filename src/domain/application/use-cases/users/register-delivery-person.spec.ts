import { InMemoryDeliveryPeopleRepository } from 'test/in-memory-repositories/delivery-people.repository'
import { RegisterDeliveryPersonUseCase } from './register-delivery-person'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { DeliveryPersonAlreadyExistsError } from '../errors/delivery-person-already-exists.error'
import { InvalidCpfError } from '../errors/invalid-cpf.error'

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
    const { cpf } = makeDeliveryPerson()
    // console.log(cpf)
    const result = await sut.execute({
      name: 'John Doe',
      cpf,
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
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '297.621.900-17',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBeTruthy()
    expect(deliveryPeopleRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register an user with an already used cpf', async () => {
    const deliveryPerson = makeDeliveryPerson()

    deliveryPeopleRepository.items.push(deliveryPerson)

    const result = await sut.execute({
      name: 'John Doe',
      cpf: deliveryPerson.cpf,
      password: '123456',
    })

    expect(result.isLeft()).toBeTruthy()
    if (result.isRight()) throw new Error()
    expect(result.value).toBeInstanceOf(DeliveryPersonAlreadyExistsError)
  })

  it('should not be able to register an user with an invalid cpf', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '111.111.111-12',
      password: '123456',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidCpfError)
  })
})
