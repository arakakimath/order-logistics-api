import { Either, left, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { DeliveryPeopleRepository } from '../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { CpfValidation } from '@/core/validation/cpf.validation'
import { InvalidCpfError } from './errors/invalid-cpf.error'

interface UpdateDeliveryPersonUseCaseRequest {
  name?: string
  cpf: string
  password?: string
  admin?: boolean
}

type UpdateDeliveryPersonUseCaseResponse = Either<
  InvalidCpfError,
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
    name,
    cpf,
    password,
    admin,
  }: UpdateDeliveryPersonUseCaseRequest): Promise<UpdateDeliveryPersonUseCaseResponse> {
    if (!CpfValidation.isCpfValid(cpf)) return left(new InvalidCpfError())

    const deliveryPerson = await this.deliveryPeopleRepository.findByCpf(cpf)

    deliveryPerson.name = name ?? deliveryPerson.name
    deliveryPerson.password = password
      ? await this.hashGenerator.hash(password)
      : deliveryPerson.password
    deliveryPerson.admin = admin ?? deliveryPerson.isAdmin()

    await this.deliveryPeopleRepository.save(deliveryPerson)

    return right({ deliveryPerson })
  }
}
