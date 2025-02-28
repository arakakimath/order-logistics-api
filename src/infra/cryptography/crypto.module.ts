import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { Hasher } from './hasher'
import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: HashGenerator, useClass: Hasher },
    { provide: HashComparer, useClass: Hasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HashGenerator, HashComparer, Encrypter],
})
export class CryptoModule {}
