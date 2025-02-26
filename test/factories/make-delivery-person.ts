import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/enterprise/entities/delivery-person'

export function makeDeliveryPerson(
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryPerson = DeliveryPerson.create(
    {
      name: faker.person.fullName(),
      cpf: `${faker.number.int(3)}.${faker.number.int(3)}.${faker.number.int(3)}-${faker.number.int(2)}`,
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryPerson
}
