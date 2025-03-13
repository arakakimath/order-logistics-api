import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { UpdateOrderUseCase } from './update-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryRecipientsRepository } from 'test/in-memory-repositories/recipients.repository'
import { makeRecipient } from 'test/factories/make-recipient'

let ordersRepository: InMemoryOrdersRepository
let recipientsRepository: InMemoryRecipientsRepository
let sut: UpdateOrderUseCase

describe('Update an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    recipientsRepository = new InMemoryRecipientsRepository()

    sut = new UpdateOrderUseCase(ordersRepository, recipientsRepository)
  })

  it('should be able to update an order', async () => {
    const recipient = makeRecipient({}, new UniqueEntityID('recipient-ID'))
    recipientsRepository.create(recipient)

    const order = makeOrder(
      {
        recipientID: new UniqueEntityID('recipient-ID'),
        status: 'pending',
        courierID: new UniqueEntityID('some-courier-ID'),
      },
      new UniqueEntityID('order-ID'),
    )

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'some-ID',
        role: 'admin',
      },
      orderProps: {
        orderID: 'order-ID',
        recipientID: 'recipient-ID',
        courierID: 'courier-ID',
        photoUrl: 'photo-URL',
        status: 'delivered',
      },
    })

    expect(result.isRight()).toBeTruthy()
    expect(ordersRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientID: new UniqueEntityID('recipient-ID'),
        courierID: new UniqueEntityID('courier-ID'),
        status: 'delivered',
        photoUrl: 'photo-URL',
      }),
    )
  })

  it('should not update a not given property', async () => {
    const order = makeOrder(
      {
        recipientID: new UniqueEntityID('recipient-ID'),
        status: 'delivered',
        photoUrl: 'photo-URL',
        courierID: new UniqueEntityID('courier-ID'),
      },
      new UniqueEntityID('order-ID'),
    )

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'some-ID',
        role: 'admin',
      },
      orderProps: {
        orderID: 'order-ID',
      },
    })

    expect(result.isRight()).toBeTruthy()
    expect(ordersRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientID: new UniqueEntityID('recipient-ID'),
        courierID: new UniqueEntityID('courier-ID'),
        status: 'delivered',
        photoUrl: 'photo-URL',
      }),
    )
  })
})
