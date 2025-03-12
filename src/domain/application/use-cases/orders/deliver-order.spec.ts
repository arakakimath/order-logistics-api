import { InMemoryOrdersRepository } from 'test/in-memory-repositories/orders.repository'
import { DeliverOrderUseCase } from './deliver-order'
import { makeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FakeUploader } from 'test/storage/fake-uploader'

let ordersRepository: InMemoryOrdersRepository
let fakeUploader: FakeUploader
let sut: DeliverOrderUseCase

describe('Deliver an order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    fakeUploader = new FakeUploader()

    sut = new DeliverOrderUseCase(ordersRepository, fakeUploader)
  })

  it('should be able to deliver an order', async () => {
    const order = makeOrder({
      recipientID: new UniqueEntityID('recipient-ID'),
      status: 'withdrawn',
      courierID: new UniqueEntityID('courier-ID'),
    })

    ordersRepository.items.push(order)

    const result = await sut.execute({
      user: {
        id: 'courier-ID',
        role: 'admin',
      },
      orderID: order.id.toString(),
      body: Buffer.from(''),
      photoName: 'profile.png',
      photoType: 'image/png',
    })

    expect(result.isRight()).toBeTruthy()
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        photoName: 'profile.png',
        url: expect.any(String),
      }),
    )
  })
})
