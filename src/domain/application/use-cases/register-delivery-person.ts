import { Either, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { DeliveryPeopleRepository } from '../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'

interface RegisterDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
  password: string
  admin?: boolean
}

type RegisterDeliveryPersonUseCaseResponse = Either<
  null,
  {
    deliveryPerson: DeliveryPerson
  }
>

@Injectable()
export class RegisterDeliveryPersonUseCase {
  constructor(private deliveryPeopleRepository: DeliveryPeopleRepository) {}

  async execute({
    name,
    cpf,
    password,
    admin,
  }: RegisterDeliveryPersonUseCaseRequest): Promise<RegisterDeliveryPersonUseCaseResponse> {
    const deliveryPerson = DeliveryPerson.create({
      name,
      cpf,
      password,
      admin,
    })

    await this.deliveryPeopleRepository.create(deliveryPerson)

    return right({ deliveryPerson })
  }
}
