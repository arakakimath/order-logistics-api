import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from 'test/factories/make-order'

let ordersRepository: InMemoryOrdersRepository
let sut: DeleteOrderUseCase

describe('Delete an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()

    sut = new DeleteOrderUseCase(ordersRepository)
  })

  it('should be able to delete an order', async () => {
    const order = makeOrder()

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'courier-ID',
        role: 'admin',
      },
      orderID: order.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(ordersRepository.items).toHaveLength(0)
  })
})
