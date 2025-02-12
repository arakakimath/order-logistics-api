import { DeliveryPersonRepository } from '@/domain/application/repositories/delivery-person.repository'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'

export class InMemoryDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  public items: DeliveryPerson[] = []

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    this.items.push(deliveryPerson)
  }
}
