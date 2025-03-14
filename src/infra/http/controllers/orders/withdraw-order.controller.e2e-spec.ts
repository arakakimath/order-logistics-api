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

describe('Withdraw Order (e2e)', () => {
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

  test('[PATCH] /orders/:orderID/withdraw', async () => {
    const order = await orderFactory.makeMongooseOrder()

    const accessToken = jwt.sign({
      sub: randomUUID(),
      role: 'regular',
    })

    const response = await request(app.getHttpServer())
      .patch(`/orders/${order.id.toString()}/withdraw`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)

    const orderOnDatabase = await mongoose.order.findById(order.id.toString())

    expect(orderOnDatabase).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        recipientID: expect.any(String),
        courierID: expect.any(String),
        status: 'withdrawn',
        createdAt: expect.any(Date),
      }),
    )
  })
})
