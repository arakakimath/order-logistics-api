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
import { OrderFactory } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Get Order (e2e)', () => {
  let app: INestApplication
  let mongoose: MongooseService
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
      providers: [OrderFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    mongoose = moduleRef.get(MongooseService)
    orderFactory = moduleRef.get(OrderFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /orders/:orderID', async () => {
    const order1 = await orderFactory.makeMongooseOrder()

    const userID = randomUUID()

    const accessToken = jwt.sign({
      sub: userID,
      role: 'regular',
    })

    const response1 = await request(app.getHttpServer())
      .get(`/orders/${order1.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response1.statusCode).toBe(200)

    const orderOnDatabase1 = await mongoose.order.findById(order1.id.toString())

    expect(orderOnDatabase1).toEqual(
      expect.objectContaining({
        _id: order1.id.toString(),
        recipientID: expect.any(String),
        courierID: undefined,
        status: 'pending',
        createdAt: expect.any(Date),
      }),
    )

    const order2 = await orderFactory.makeMongooseOrder({
      status: 'withdrawn',
      courierID: new UniqueEntityID(userID),
    })

    const response2 = await request(app.getHttpServer())
      .get(`/orders/${order2.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response2.statusCode).toBe(200)

    const orderOnDatabase2 = await mongoose.order.findById(order2.id.toString())

    expect(orderOnDatabase2).toEqual(
      expect.objectContaining({
        _id: order2.id.toString(),
        recipientID: expect.any(String),
        courierID: expect.any(String),
        status: 'withdrawn',
        createdAt: expect.any(Date),
      }),
    )
  })
})
