import { Either, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'

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
  constructor() {}

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

    return right({ deliveryPerson })
  }
}
