import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'

export abstract class DeliveryPeopleRepository {
  abstract create(deliveryPerson: DeliveryPerson): Promise<void>
  abstract findByCpf(cpf: string): Promise<DeliveryPerson | null>
}
