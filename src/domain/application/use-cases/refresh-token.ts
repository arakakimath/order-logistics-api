import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidCpfError } from './errors/invalid-cpf.error'
import { TokenService } from '../cryptography/token-service'
import { WrongCredentialsError } from './errors/wrong-credentials.error'
import { InvalidTokenError } from './errors/invalid-token.error'

interface RefreshTokenUseCaseRequest {
  refreshToken: string
}

type RefreshTokenUseCaseResponse = Either<
  InvalidCpfError | WrongCredentialsError,
  {
    accessToken: string
    refreshToken: string
  }
>

@Injectable()
export class RefreshTokenUseCase {
  constructor(private tokenservice: TokenService) {}

  async execute({
    refreshToken,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    const payload = await this.tokenservice.decode(refreshToken)

    if (!payload) return left(new InvalidTokenError())

    const { sub, role } = payload

    const accessToken = await this.tokenservice.sign({ sub, role })
    refreshToken = await this.tokenservice.sign({ sub, role }, '1d')

    return right({ accessToken, refreshToken })
  }
}
