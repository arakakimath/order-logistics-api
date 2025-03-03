import { AppModule } from '@/app.module'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import {
  DeliveryPersonFactory,
  makeDeliveryPerson,
} from 'test/factories/make-delivery-person'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/infra/env/env'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Register delivery person (e2e)', () => {
  let app: INestApplication
  let mongoose: MongooseService
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

    mongoose = moduleRef.get(MongooseService)
    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /users', async () => {
    const deliveryPerson =
      await deliveryPersonFactory.makeMongooseDeliveryStudent({ admin: true })

    const accessToken = jwt.sign({
      sub: deliveryPerson.id.toString(),
      role: deliveryPerson.isAdmin(),
    })

    const { cpf } = makeDeliveryPerson()

    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        cpf,
        password: '123456',
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await mongoose.user.findOne({
      cpf,
    })

    expect(userOnDatabase).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })
})
