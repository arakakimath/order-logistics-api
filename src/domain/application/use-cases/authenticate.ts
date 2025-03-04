import { Either, left, right } from '@/core/either'
import { DeliveryPeopleRepository } from '../repositories/delivery-people.repository'
import { Injectable } from '@nestjs/common'
import { CpfValidation } from '@/core/validation/cpf.validation'
import { InvalidCpfError } from './errors/invalid-cpf.error'
import { TokenService } from '../cryptography/token-service'
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
    refreshToken: string
  }
>

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
    private hashComparer: HashComparer,
    private tokenservice: TokenService,
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

    const payload = {
      sub: deliveryPerson.id.toString(),
      role: deliveryPerson.isAdmin() ? 'admin' : 'regular',
    }

    const accessToken = await this.tokenservice.sign(payload)
    const refreshToken = await this.tokenservice.sign(payload, '1d')

    return right({ accessToken, refreshToken })
  }
}
