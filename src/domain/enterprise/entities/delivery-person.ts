import { Entity } from "../../../core/entity";
import { UniqueEntityID } from "../../../core/unique-entity-id";

interface DeliveryPersonProps {
  name: string
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  static create(props: DeliveryPersonProps, id?: UniqueEntityID) {
    const deliveryPerson = new DeliveryPerson(props, id)

    return deliveryPerson
  }
}