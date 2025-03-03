import { Either, left, right } from '@/core/either'
import { DeliveryPeopleRepository } from '../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { CpfValidation } from '@/core/validation/cpf.validation'
import { InvalidCpfError } from './errors/invalid-cpf.error'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { WrongCredentialsError } from './errors/wrong-credentials.error'

interface AuthenticateUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCpfError | WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    if (!CpfValidation.isCpfValid(cpf)) return left(new InvalidCpfError())

    const deliveryPerson = await this.deliveryPeopleRepository.findByCpf(cpf)

    if (!deliveryPerson) return left(new WrongCredentialsError())

    const isPasswordValid = await this.hashComparer.compare(
      password,
      deliveryPerson.password,
    )

    if (!isPasswordValid) return left(new WrongCredentialsError())

    const accessToken = await this.encrypter.encrypt({
      sub: deliveryPerson.id.toString(),
      role: deliveryPerson.isAdmin() ? 'admin' : 'regular',
    })

    return right({ accessToken })
  }
}
