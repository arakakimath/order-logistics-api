import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'

export abstract class DeliveryPeopleRepository {
  abstract create(deliveryPerson: DeliveryPerson): Promise<void>
  abstract save(deliveryPerson: DeliveryPerson): Promise<void>
  abstract findByCpf(cpf: string): Promise<DeliveryPerson | null>
  abstract findByID(id: string): Promise<DeliveryPerson | null>
  abstract findByGitHubUsername(
    username: string,
  ): Promise<DeliveryPerson | null>
}
