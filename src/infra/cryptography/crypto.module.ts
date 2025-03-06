import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { TokenService } from '@/domain/application/cryptography/token-service'
import { JwtTokenService } from './jwt-token-service'

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: TokenService, useClass: JwtTokenService },
    JwtTokenService,
  ],
  exports: [HashGenerator, HashComparer, TokenService, JwtTokenService],
})
export class CryptoModule {}
