import { TokenService } from '@/domain/application/cryptography/token-service'

export class FakeTokenService implements TokenService {
  async sign(
    payload: Record<string, unknown>,
    expiresIn?: string,
  ): Promise<string> {
    return JSON.stringify({ ...payload, expiresIn })
  }

  async decode(token: string): Promise<Record<string, unknown> | null> {
    return JSON.parse(token)
  }
}
