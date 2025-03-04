import { AppModule } from '@/app.module'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { DatabaseModule } from '@/infra/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/infra/env/env'
import { hash } from 'bcryptjs'
import cookieParser from 'cookie-parser'

describe('Refresh token (e2e)', () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory

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
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    app.use(cookieParser())

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)

    await app.init()
  })

  test('[POST] /auth', async () => {
    const deliveryPerson =
      await deliveryPersonFactory.makeMongooseDeliveryStudent({
        password: await hash('123456', 8),
      })

    const authResponse = await request(app.getHttpServer()).post('/auth').send({
      cpf: deliveryPerson.cpf,
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.getHttpServer())
      .get('/auth/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
      }),
    )
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
