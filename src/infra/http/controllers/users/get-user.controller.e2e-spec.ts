import { AppModule } from '@/app.module'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/infra/env/env'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get delivery person (e2e)', () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory
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
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /users/:cpf', async () => {
    const deliveryPerson =
      await deliveryPersonFactory.makeMongooseDeliveryStudent({
        name: 'John Doe',
        admin: true,
      })

    const accessToken = jwt.sign({
      sub: deliveryPerson.id.toString(),
      role: deliveryPerson.isAdmin() ? 'admin' : 'regular',
    })

    const { cpf } = deliveryPerson

    const response = await request(app.getHttpServer())
      .get(`/users/${cpf}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body.delivery_person).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        cpf,
        admin: true,
      }),
    )
  })
})
