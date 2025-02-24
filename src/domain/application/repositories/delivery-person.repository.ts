import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'

export interface DeliveryPersonRepository {
  create(deliveryPerson: DeliveryPerson): Promise<void>
}
