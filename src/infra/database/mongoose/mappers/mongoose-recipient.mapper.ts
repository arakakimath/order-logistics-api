import { Recipient } from '@/domain/enterprise/entities/recipient'
import { MongooseTypes } from '../types/mongoose.types'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongooseRecipientMapper {
  static toMongoose(recipient: Recipient): MongooseTypes.CreateRecipient {
    return {
      _id: recipient.id.toString(),
      name: recipient.name,
    }
  }

  static toDomain(recipient: MongooseTypes.CreateRecipient): Recipient {
    return Recipient.create(
      {
        name: recipient.name,
      },
      new UniqueEntityID(recipient._id),
    )
  }
}
