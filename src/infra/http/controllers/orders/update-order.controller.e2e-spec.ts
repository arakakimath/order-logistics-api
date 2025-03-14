import { AppModule } from '@/app.module'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/infra/env/env'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'
import { randomUUID } from 'node:crypto'
import { RecipientFactory } from 'test/factories/make-recipient'
import { OrderFactory } from 'test/factories/make-order'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'

describe('Update Order (e2e)', () => {
  let app: INestApplication
  let mongoose: MongooseService
  let recipientFactory: RecipientFactory
  let orderFactory: OrderFactory
  let courierFactory: DeliveryPersonFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        DatabaseModule,
        ConfigModule.forRoot({
          validate: (env) => envSchema.parse(env),
          isGlobal: true,
        }),
      ],
      providers: [RecipientFactory, OrderFactory, DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    mongoose = moduleRef.get(MongooseService)
    recipientFactory = moduleRef.get(RecipientFactory)
    orderFactory = moduleRef.get(OrderFactory)
    courierFactory = moduleRef.get(DeliveryPersonFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /orders/:orderID', async () => {
    const recipient = await recipientFactory.makeMongooseRecipient()

    const order = await orderFactory.makeMongooseOrder()

    const courier = await courierFactory.makeMongooseDeliveryPerson()

    const accessToken = jwt.sign({
      sub: randomUUID(),
      role: 'admin',
    })

    const response = await request(app.getHttpServer())
      .put(`/orders/${order.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        recipientID: recipient.id.toString(),
        courierID: courier.id.toString(),
        status: 'delivered',
        photoUrl: 'photo-url',
        returnReason: 'return message',
      })

    expect(response.statusCode).toBe(200)

    const orderOnDatabase = await mongoose.order.findById(order.id.toString())

    expect(orderOnDatabase).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        recipientID: recipient.id.toString(),
        courierID: courier.id.toString(),
        status: 'delivered',
        photoUrl: 'photo-url',
        returnReason: 'return message',
        createdAt: expect.any(Date),
      }),
    )
  })
})
