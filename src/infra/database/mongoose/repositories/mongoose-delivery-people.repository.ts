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
}
