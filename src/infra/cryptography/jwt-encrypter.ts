import { Encrypter } from '@/domain/application/cryptography/encrypter'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    throw new Error(JSON.stringify(payload))
  }
}
