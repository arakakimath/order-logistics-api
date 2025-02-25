import { Either, left, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { DeliveryPeopleRepository } from '../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { DeliveryPersonAlreadyExistsError } from './errors/delivery-person-already-exists.error'

interface RegisterDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
  password: string
  admin?: boolean
}

type RegisterDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonAlreadyExistsError,
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

    const deliveryPersonOnDatabase =
      await this.deliveryPeopleRepository.findByCpf(cpf)

    if (deliveryPersonOnDatabase) {
      return left(new DeliveryPersonAlreadyExistsError())
    }

    await this.deliveryPeopleRepository.create(deliveryPerson)

    return right({ deliveryPerson })
  }
}
