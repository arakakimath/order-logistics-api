import { DeliveryPeopleRepository } from '@/domain/application/repositories/delivery-people.repository'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { Injectable } from '@nestjs/common'
import { MongooseDeliveryPersonMapper } from '../mappers/mongoose-delivery-person.mapper'
import { MongooseService } from '../mongoose.service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

@Injectable()
export class MongooseDeliveryPeopleRepository
  implements DeliveryPeopleRepository
{
  constructor(private mongoose: MongooseService) {}

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    const data = MongooseDeliveryPersonMapper.toMongoose(deliveryPerson)

    await this.mongoose.user.create(data)
  }

  async findByCpf(cpf: string) {
    const deliveryPerson = await this.mongoose.user.findOne({ cpf })

    return deliveryPerson
      ? DeliveryPerson.create(
          {
            name: deliveryPerson.name,
            cpf: deliveryPerson.cpf,
            admin: deliveryPerson.admin,
            password: deliveryPerson.password,
          },
          new UniqueEntityID(deliveryPerson._id),
        )
      : null
  }
}
