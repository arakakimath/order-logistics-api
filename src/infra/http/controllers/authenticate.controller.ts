import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/auth')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {
    const token = await this.jwt.sign({ sub: 'user-id' })

    return token
  }
}
