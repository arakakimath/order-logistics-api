import { AppModule } from '@/app.module'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/infra/env/env'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'
import { OrderFactory } from 'test/factories/make-order'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'

describe('Return Order (e2e)', () => {
  let app: INestApplication
  let mongoose: MongooseService
  let courierFactory: DeliveryPersonFactory
  let orderFactory: OrderFactory
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
      providers: [OrderFactory, DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    mongoose = moduleRef.get(MongooseService)
    orderFactory = moduleRef.get(OrderFactory)
    courierFactory = moduleRef.get(DeliveryPersonFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /orders/:orderID/return', async () => {
    const courier = await courierFactory.makeMongooseDeliveryPerson()

    const order = await orderFactory.makeMongooseOrder({
      courierID: courier.id,
      status: 'withdrawn',
    })

    const accessToken = jwt.sign({
      sub: courier.id.toString(),
      role: 'regular',
    })

    const response = await request(app.getHttpServer())
      .patch(`/orders/${order.id.toString()}/return`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ returnReason: 'recipient refused to receive package.' })

    expect(response.statusCode).toBe(200)

    const orderOnDatabase = await mongoose.order.findById(order.id.toString())

    expect(orderOnDatabase).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        recipientID: expect.any(String),
        courierID: courier.id.toString(),
        status: 'returned',
        returnReason: 'recipient refused to receive package.',
        createdAt: expect.any(Date),
      }),
    )
  })
})
