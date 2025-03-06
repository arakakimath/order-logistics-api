import { DeliveryPeopleRepository } from '@/domain/application/repositories/delivery-people.repository'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'

export class InMemoryDeliveryPeopleRepository
  implements DeliveryPeopleRepository
{
  public items: DeliveryPerson[] = []

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    this.items.push(deliveryPerson)
  }

  async save(deliveryPerson: DeliveryPerson): Promise<void> {
    const index = this.items.findIndex((item) =>
      item.id.equals(deliveryPerson.id),
    )

    this.items[index] = deliveryPerson
  }

  async findByCpf(cpf: string): Promise<DeliveryPerson | null> {
    return this.items.filter((item) => item.cpf === cpf)[0]
  }

  async findByID(id: string): Promise<DeliveryPerson | null> {
    return this.items.filter((item) => item.id.toString() === id)[0]
  }

  async findByGitHubUsername(username: string): Promise<DeliveryPerson | null> {
    return this.items.filter((item) => item.githubUsername === username)[0]
  }
}
