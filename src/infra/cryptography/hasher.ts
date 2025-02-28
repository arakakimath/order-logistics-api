import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Hasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    throw new Error(plain)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    throw new Error(plain + hash)
  }
}
