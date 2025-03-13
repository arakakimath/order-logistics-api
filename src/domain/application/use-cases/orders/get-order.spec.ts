import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { GetOrderUseCase } from './get-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeOrder } from 'test/factories/make-order'

let ordersRepository: InMemoryOrdersRepository
let sut: GetOrderUseCase

describe('Get an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()

    sut = new GetOrderUseCase(ordersRepository)
  })

  it('should be able to get an order', async () => {
    const order = makeOrder(
      {
        recipientID: new UniqueEntityID('recipient-ID'),
        status: 'returned',
        courierID: new UniqueEntityID('courier-ID'),
        returnReason: 'recipient refused to receive package.',
      },
      new UniqueEntityID('order-ID'),
    )

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'courier-ID',
        role: 'admin',
      },
      orderID: 'order-ID',
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight())
      expect(result.value.order).toEqual(
        expect.objectContaining({
          recipientID: new UniqueEntityID('recipient-ID'),
          courierID: new UniqueEntityID('courier-ID'),
          status: 'returned',
          returnReason: 'recipient refused to receive package.',
        }),
      )
  })

  it('should not be able to get another courier order if not admin', async () => {
    const order = makeOrder(
      {
        recipientID: new UniqueEntityID('recipient-ID'),
        status: 'returned',
        courierID: new UniqueEntityID('courier1-ID'),
        returnReason: 'recipient refused to receive package.',
      },
      new UniqueEntityID('order-ID'),
    )

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'courier2-ID',
        role: 'regular',
      },
      orderID: 'order-ID',
    })

    expect(result.isLeft()).toBeTruthy()
  })
})
