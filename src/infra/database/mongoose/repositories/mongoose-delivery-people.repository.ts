import { DeliveryPeopleRepository } from '@/domain/application/repositories/delivery-people.repository'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { Injectable } from '@nestjs/common'
import { MongooseDeliveryPersonMapper } from '../mappers/mongoose-delivery-person.mapper'
import { MongooseService } from '../mongoose.service'

@Injectable()
export class MongooseDeliveryPeopleRepository
  implements DeliveryPeopleRepository
{
  constructor(private mongoose: MongooseService) {}

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    const data = MongooseDeliveryPersonMapper.toMongoose(deliveryPerson)

    await this.mongoose.user.create(data)
  }

  async save(deliveryPerson: DeliveryPerson): Promise<void> {
    const data = MongooseDeliveryPersonMapper.toMongoose(deliveryPerson)

    await this.mongoose.user.updateOne({ _id: data._id }, data)
  }

  async delete(deliveryPerson: DeliveryPerson): Promise<void> {
    await this.mongoose.user.deleteOne({ _id: deliveryPerson.id.toString() })
  }

  async findByCpf(cpf: string) {
    const deliveryPerson = await this.mongoose.user.findOne({ cpf })

    return deliveryPerson
      ? MongooseDeliveryPersonMapper.toDomain(deliveryPerson)
      : null
  }

  async findByID(id: string) {
    const deliveryPerson = await this.mongoose.user.findById({ _id: id })

    return deliveryPerson
      ? MongooseDeliveryPersonMapper.toDomain(deliveryPerson)
      : null
  }

  async findByGitHubUsername(username: string) {
    const deliveryPerson = await this.mongoose.user.findOne({
      githubUsername: username,
    })

    return deliveryPerson
      ? MongooseDeliveryPersonMapper.toDomain(deliveryPerson)
      : null
  }
}
