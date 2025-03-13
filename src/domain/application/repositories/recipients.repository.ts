import { Recipient } from '@/domain/enterprise/entities/recipient'

export abstract class RecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>
  abstract findByID(id: string): Promise<Recipient | null>
}
