import { AppModule } from '@/app.module'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

describe('Register delivery person (e2e)', () => {
  let app: INestApplication
  let mongoose: MongooseService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    mongoose = moduleRef.get(MongooseService)

    await app.init()

    await mongoose.user.deleteMany({
      _id: { $regex: '^teste2e' },
    })
  })

  afterAll(async () => {
    await mongoose.user.deleteMany({
      _id: { $regex: '^teste2e' },
    })
  })

  test('[POST] /users', async () => {
    const { cpf } = makeDeliveryPerson()

    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'John Doe',
      cpf,
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await mongoose.user.findOne({
      _id: { $regex: '^teste2e' },
    })

    expect(userOnDatabase).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })
})
