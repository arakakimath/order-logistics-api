import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/enterprise/entities/delivery-person'
import { CpfValidation } from '@/core/validation/cpf.validation'

export function makeDeliveryPerson(
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueEntityID,
) {
  const cpfFirstDigits = `${faker.number.int({ max: 9 })}${faker.number.int({ max: 9 })}${faker.number.int({ max: 9 })}.${faker.number.int({ max: 9 })}${faker.number.int({ max: 9 })}${faker.number.int({ max: 9 })}.${faker.number.int({ max: 9 })}${faker.number.int({ max: 9 })}${faker.number.int({ max: 9 })}`
  const cpfLastDigits =
    CpfValidation.getCpfLastDigits(cpfFirstDigits).toString()
  const cpf = cpfFirstDigits + '-' + cpfLastDigits

  const deliveryPerson = DeliveryPerson.create(
    {
      name: faker.person.fullName(),
      cpf,
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryPerson
}
