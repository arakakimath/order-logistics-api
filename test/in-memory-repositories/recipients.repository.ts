import { RecipientsRepository } from '@/domain/application/repositories/recipients.repository'
import { Recipient } from '@/domain/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }

  async findByID(id: string): Promise<Recipient | null> {
    return this.items.filter((item) => item.id.toString() === id)[0]
  }
}
