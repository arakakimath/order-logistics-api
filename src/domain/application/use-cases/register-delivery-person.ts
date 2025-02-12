import { Either, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { DeliveryPersonRepository } from '../repositories/delivery-person.repository'

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

export class RegisterDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

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

    await this.deliveryPersonRepository.create(deliveryPerson)

    return right({ deliveryPerson })
  }
}
