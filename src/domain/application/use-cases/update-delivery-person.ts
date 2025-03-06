import { Either, left, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { DeliveryPeopleRepository } from '../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliveryPersonNotFoundError } from './errors/delivery-person-not-found.error'

interface UpdateDeliveryPersonUseCaseRequest {
  cpf: string
  name?: string
  password?: string
  admin?: boolean
}

type UpdateDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError,
  {
    deliveryPerson: DeliveryPerson
  }
>

@Injectable()
export class UpdateDeliveryPersonUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    cpf,
    name,
    password,
    admin,
  }: UpdateDeliveryPersonUseCaseRequest): Promise<UpdateDeliveryPersonUseCaseResponse> {
    const deliveryPerson = await this.deliveryPeopleRepository.findByCpf(cpf)

    if (!deliveryPerson) return left(new DeliveryPersonNotFoundError())

    deliveryPerson.name = name ?? deliveryPerson.name
    deliveryPerson.password = password
      ? await this.hashGenerator.hash(password)
      : deliveryPerson.password
    deliveryPerson.admin = admin ?? deliveryPerson.isAdmin()

    await this.deliveryPeopleRepository.save(deliveryPerson)

    return right({ deliveryPerson })
  }
}
