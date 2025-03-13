import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { ReturnOrderUseCase } from './return-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeOrder } from 'test/factories/make-order'
import { CourierNOrderDontMatchError } from '../errors/wrong-courier.error'
import { OrderNotAvailableForDeliveryOrReturnError } from '../errors/order-not-available-for-delivery-or-return.error'

let ordersRepository: InMemoryOrdersRepository
let sut: ReturnOrderUseCase

describe('Return an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()

    sut = new ReturnOrderUseCase(ordersRepository)
  })

  it('should be able to return an order', async () => {
    const order = makeOrder(
      {
        recipientID: new UniqueEntityID('recipient-ID'),
        status: 'withdrawn',
        courierID: new UniqueEntityID('courier-ID'),
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
      returnReason: 'recipient refuses to receive package.',
    })

    expect(result.isRight()).toBeTruthy()
    expect(ordersRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientID: new UniqueEntityID('recipient-ID'),
        courierID: new UniqueEntityID('courier-ID'),
        status: 'returned',
        returnReason: 'recipient refuses to receive package.',
      }),
    )
  })

  it(`should not be able to return another courier's order`, async () => {
    const order = makeOrder(
      {
        recipientID: new UniqueEntityID('recipient-ID'),
        status: 'withdrawn',
        courierID: new UniqueEntityID('courier1-ID'),
      },
      new UniqueEntityID('order-ID'),
    )

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'courier2-ID',
        role: 'admin',
      },
      orderID: 'order-ID',
      returnReason: 'recipient refuses to receive package.',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(CourierNOrderDontMatchError)
  })

  it('should not be able to return an order that was not withdrawn', async () => {
    const order = makeOrder(
      {
        recipientID: new UniqueEntityID('recipient-ID'),
        status: 'pending',
        courierID: new UniqueEntityID('courier-ID'),
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
      returnReason: 'recipient refuses to receive package.',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(
      OrderNotAvailableForDeliveryOrReturnError,
    )
  })
})
