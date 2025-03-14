import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { WithdrawOrderUseCase } from './withdraw-order'
import { makeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let ordersRepository: InMemoryOrdersRepository
let sut: WithdrawOrderUseCase

describe('Withdraw an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()

    sut = new WithdrawOrderUseCase(ordersRepository)
  })

  it('should be able to withdraw an order', async () => {
    const order = makeOrder({ recipientID: new UniqueEntityID('recipient-ID') })

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'some-ID',
        role: 'admin',
      },
      orderID: order.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(ordersRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientID: new UniqueEntityID('recipient-ID'),
        courierID: new UniqueEntityID('some-ID'),
        status: 'withdrawn',
      }),
    )
  })

  it('should not be able to withdraw an inexisting order', async () => {
    const result = await sut.execute({
      user: {
        id: 'some-ID',
        role: 'admin',
      },
      orderID: 'inexisting-order-ID',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(ordersRepository.items[0]).toBeFalsy()
  })
})
