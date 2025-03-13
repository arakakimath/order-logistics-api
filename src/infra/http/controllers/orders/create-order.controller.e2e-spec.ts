import { AppModule } from '@/app.module'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/infra/env/env'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'
import { randomUUID } from 'node:crypto'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Create Order (e2e)', () => {
  let app: INestApplication
  let mongoose: MongooseService
  let recipientFactory: RecipientFactory
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
      providers: [RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    mongoose = moduleRef.get(MongooseService)
    recipientFactory = moduleRef.get(RecipientFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /orders', async () => {
    const recipient = await recipientFactory.makeMongooseRecipient()

    const accessToken = jwt.sign({
      sub: randomUUID(),
      role: 'admin',
    })

    const response = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        recipientID: recipient.id.toString(),
      })

    expect(response.statusCode).toBe(201)

    const orderOnDatabase = await mongoose.order.findOne({
      recipientID: recipient.id.toString(),
    })

    expect(orderOnDatabase).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        status: 'pending',
        createdAt: expect.any(Date),
      }),
    )
  })
})
