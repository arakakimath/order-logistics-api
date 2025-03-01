import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { JwtService } from '@nestjs/jwt'

export class JwtEncrypter implements Encrypter {
  constructor(private jwt: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwt.sign(payload)
  }
}
