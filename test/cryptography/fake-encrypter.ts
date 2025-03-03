import { Encrypter } from '@/domain/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(
    payload: Record<string, unknown>,
    expiresIn?: string,
  ): Promise<string> {
    return JSON.stringify({ ...payload, expiresIn })
  }
}
