import { Either, left, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { DeliveryPeopleRepository } from '../../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { DeliveryPersonNotFoundError } from '../errors/delivery-person-not-found.error'

interface GetDeliveryPersonUseCaseRequest {
  cpf: string
}

type GetDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError,
  {
    deliveryPerson: DeliveryPerson
  }
>

@Injectable()
export class GetDeliveryPersonUseCase {
  constructor(private deliveryPeopleRepository: DeliveryPeopleRepository) {}

  async execute({
    cpf,
  }: GetDeliveryPersonUseCaseRequest): Promise<GetDeliveryPersonUseCaseResponse> {
    const deliveryPerson = await this.deliveryPeopleRepository.findByCpf(cpf)

    if (!deliveryPerson) return left(new DeliveryPersonNotFoundError())

    return right({ deliveryPerson })
  }
}
