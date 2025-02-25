import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { MongooseTypes } from '../types/mongoose.types'

export class MongooseDeliveryPersonMapper {
  static toMongoose(deliveryPerson: DeliveryPerson): MongooseTypes.CreateUser {
    return {
      _id: deliveryPerson.id.toString(),
      name: deliveryPerson.name,
      cpf: deliveryPerson.cpf,
      password: deliveryPerson.password,
      admin: deliveryPerson.isAdmin(),
    }
  }
}
