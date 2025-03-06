import { Either, left, right } from '@/core/either'
import { DeliveryPerson } from '@/domain/enterprise/entities/delivery-person'
import { DeliveryPeopleRepository } from '../../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { DeliveryPersonAlreadyExistsError } from '../errors/delivery-person-already-exists.error'
import { HashGenerator } from '../../cryptography/hash-generator'
import { CpfValidation } from '@/core/validation/cpf.validation'
import { InvalidCpfError } from '../errors/invalid-cpf.error'

interface RegisterDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
  password: string
  admin?: boolean
}

type RegisterDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonAlreadyExistsError | InvalidCpfError,
  {
    deliveryPerson: DeliveryPerson
  }
>

@Injectable()
export class RegisterDeliveryPersonUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
    admin,
  }: RegisterDeliveryPersonUseCaseRequest): Promise<RegisterDeliveryPersonUseCaseResponse> {
    const passwordHashed = await this.hashGenerator.hash(password)

    if (!CpfValidation.isCpfValid(cpf)) return left(new InvalidCpfError())

    const deliveryPerson = DeliveryPerson.create({
      name,
      cpf,
      password: passwordHashed,
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
