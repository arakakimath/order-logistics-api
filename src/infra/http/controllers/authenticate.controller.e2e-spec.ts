import { AppModule } from '@/app.module'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { hash } from 'bcryptjs'
import { DatabaseModule } from '@/infra/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/infra/env/env'

describe('Authenticate delivery person (e2e)', () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory

  beforeAll(async () => {
    console.log('Carregando teste.')
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        DatabaseModule,
        ConfigModule.forRoot({
          validate: (env) => envSchema.parse(env),
          isGlobal: true,
        }),
      ],
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)

    await app.init()
  })

  test('[POST] /auth', async () => {
    const deliveryPerson =
      await deliveryPersonFactory.makeMongooseDeliveryStudent({
        password: await hash('123456', 8),
      })

    const response = await request(app.getHttpServer()).post('/auth').send({
      cpf: deliveryPerson.cpf,
      password: '123456',
    })

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
      }),
    )
  })
})
