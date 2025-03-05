import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { MongooseTypes } from '../types/mongoose.types'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongooseDeliveryPersonMapper {
  static toMongoose(deliveryPerson: DeliveryPerson): MongooseTypes.CreateUser {
    return {
      _id: deliveryPerson.id.toString(),
      name: deliveryPerson.name,
      cpf: deliveryPerson.cpf,
      password: deliveryPerson.password,
      admin: deliveryPerson.isAdmin(),
      githubUsername: deliveryPerson.githubUsername,
    }
  }

  static toDomain(deliveryPerson: MongooseTypes.CreateUser): DeliveryPerson {
    return DeliveryPerson.create(
      {
        name: deliveryPerson.name,
        cpf: deliveryPerson.cpf,
        password: deliveryPerson.password,
        admin: deliveryPerson.admin,
        githubUsername: deliveryPerson.githubUsername,
      },
      new UniqueEntityID(deliveryPerson._id),
    )
  }
}
