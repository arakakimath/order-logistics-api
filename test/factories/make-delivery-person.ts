import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/enterprise/entities/delivery-person'
import { CpfValidation } from '@/core/validation/cpf.validation'
import { Injectable } from '@nestjs/common'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import { MongooseDeliveryPersonMapper } from '@/infra/database/mongoose/mappers/mongoose-delivery-person.mapper'

function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function createCpf(): string {
  let cpfFirstDigits: string = ''
  for (let i = 0; i < 9; i++) {
    cpfFirstDigits += faker.number.int({ max: 9 })
  }

  const cpf = cpfFirstDigits + CpfValidation.getCpfLastDigits(cpfFirstDigits)

  return formatCPF(cpf)
}

export function makeDeliveryPerson(
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryPerson = DeliveryPerson.create(
    {
      name: faker.person.fullName(),
      cpf: createCpf(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryPerson
}

@Injectable()
export class DeliveryPersonFactory {
  constructor(private mongoose: MongooseService) {}

  async makeMongooseDeliveryStudent(
    data: Partial<DeliveryPersonProps> = {},
  ): Promise<DeliveryPerson> {
    const deliveryPerson = makeDeliveryPerson(data)

    await this.mongoose.user.create(
      MongooseDeliveryPersonMapper.toMongoose(deliveryPerson),
    )

    return deliveryPerson
  }
}
