import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { CreateOrderUseCase } from './create-order'

let ordersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()

    sut = new CreateOrderUseCase(ordersRepository)
  })

  it('should be able to create an order', async () => {
    const result = await sut.execute({
      user: {
        id: 'some-ID',
        role: 'admin',
      },
      recipientID: 'recipient-ID',
    })

    expect(result.isRight()).toBeTruthy()
    expect(ordersRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientID: 'recipient-ID',
      }),
    )
  })
})
