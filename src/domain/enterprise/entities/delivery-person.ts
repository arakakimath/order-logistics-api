import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface DeliveryPersonProps {
  name: string
  cpf: string
  password: string
  admin: boolean
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  isAdmin() {
    return this.props.admin
  }

  static create(
    props: Optional<DeliveryPersonProps, 'admin'>,
    id?: UniqueEntityID,
  ) {
    const deliveryPerson = new DeliveryPerson(
      {
        ...props,
        admin: props.admin ?? false,
      },
      id,
    )

    return deliveryPerson
  }
}
