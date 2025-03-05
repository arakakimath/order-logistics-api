import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { IS_PUBLIC_KEY } from './public'
import { Request } from 'express'
import { JwtTokenService } from '../cryptography/jwt-token-service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwt: JwtTokenService,
  ) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      const req: Request = super.getRequest(context)

      if (req.headers.authorization) {
        req.user = this.jwt.decode(req.headers.authorization.split(' ')[1])
      }

      return true
    }
    return super.canActivate(context)
  }
}
