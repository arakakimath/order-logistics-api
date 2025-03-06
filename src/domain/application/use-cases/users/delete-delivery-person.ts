import { Either, left, right } from '@/core/either'
import { DeliveryPeopleRepository } from '../../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { DeliveryPersonNotFoundError } from '../errors/delivery-person-not-found.error'

interface DeleteDeliveryPersonUseCaseRequest {
  cpf: string
}

type DeleteDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError,
  null
>

@Injectable()
export class DeleteDeliveryPersonUseCase {
  constructor(private deliveryPeopleRepository: DeliveryPeopleRepository) {}

  async execute({
    cpf,
  }: DeleteDeliveryPersonUseCaseRequest): Promise<DeleteDeliveryPersonUseCaseResponse> {
    const deliveryPerson = await this.deliveryPeopleRepository.findByCpf(cpf)

    if (!deliveryPerson) return left(new DeliveryPersonNotFoundError())

    await this.deliveryPeopleRepository.delete(deliveryPerson)

    return right(null)
  }
}
