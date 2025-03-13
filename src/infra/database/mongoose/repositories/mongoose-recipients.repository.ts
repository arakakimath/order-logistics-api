import { RecipientsRepository } from '@/domain/application/repositories/recipients.repository'
import { Recipient } from '@/domain/enterprise/entities/recipient'
import { MongooseRecipientMapper } from '../mappers/mongoose-recipient.mapper'
import { MongooseService } from '../mongoose.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MongooseRecipientsRepository implements RecipientsRepository {
  constructor(private mongoose: MongooseService) {}

  async create(recipient: Recipient): Promise<void> {
    const data = MongooseRecipientMapper.toMongoose(recipient)

    await this.mongoose.recipient.create(data)
  }

  async findByID(id: string): Promise<Recipient | null> {
    const recipient = await this.mongoose.recipient.findById(id)

    return recipient ? MongooseRecipientMapper.toDomain(recipient) : null
  }
}
