import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { CreateOrderUseCase } from './create-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryRecipientsRepository } from 'test/in-memory-repositories/recipients.repository'
import { Recipient } from '@/domain/enterprise/entities/recipient'
import { makeRecipient } from 'test/factories/make-recipient'

let ordersRepository: InMemoryOrdersRepository
let recipientsRepository: InMemoryRecipientsRepository
let sut: CreateOrderUseCase

describe('Create an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    recipientsRepository = new InMemoryRecipientsRepository()

    sut = new CreateOrderUseCase(ordersRepository, recipientsRepository)
  })

  it('should be able to create an order', async () => {
    const recipient = makeRecipient({}, new UniqueEntityID('recipient-ID'))

    recipientsRepository.create(recipient)

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
        recipientID: new UniqueEntityID('recipient-ID'),
      }),
    )
  })
})
