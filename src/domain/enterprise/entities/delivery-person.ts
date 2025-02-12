import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'

interface DeliveryPersonProps {
  name: string
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  static create(props: DeliveryPersonProps, id?: UniqueEntityID) {
    const deliveryPerson = new DeliveryPerson(props, id)

    return deliveryPerson
  }
}
