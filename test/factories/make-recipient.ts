import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import { MongooseRecipientMapper } from '@/infra/database/mongoose/mappers/mongoose-recipient.mapper'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: faker.airline.airport.name,
      ...override,
    },
    id,
  )

  return recipient
}

@Injectable()
export class RecipientFactory {
  constructor(private mongoose: MongooseService) {}

  async makeMongooseRecipient(
    data: Partial<RecipientProps> = {},
  ): Promise<Recipient> {
    const recipient = makeRecipient(data)

    await this.mongoose.recipient.create(
      MongooseRecipientMapper.toMongoose(recipient),
    )

    return recipient
  }
}
