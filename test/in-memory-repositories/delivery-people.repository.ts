import { DeliveryPeopleRepository } from '@/domain/application/repositories/delivery-people.repository'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'

export class InMemoryDeliveryPeopleRepository
  implements DeliveryPeopleRepository
{
  public items: DeliveryPerson[] = []

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    this.items.push(deliveryPerson)
  }

  async findByCpf(cpf: string): Promise<DeliveryPerson | null> {
    return this.items.filter((item) => item.cpf === cpf)[0]
  }
}
