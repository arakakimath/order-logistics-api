import { TokenService } from '@/domain/application/cryptography/token-service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { tokenPayloadSchema } from '../auth/jwt.strategy'

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private jwt: JwtService) {}

  async sign(
    payload: Record<string, unknown>,
    expiresIn?: string,
  ): Promise<string> {
    return this.jwt.sign(payload, { expiresIn: expiresIn ?? '10m' })
  }

  async decode(token: string): Promise<Record<string, unknown> | null> {
    try {
      const payload = this.jwt.verify(token)
      tokenPayloadSchema.parse(payload)

      return payload
    } catch (error) {
      return null
    }
  }
}
