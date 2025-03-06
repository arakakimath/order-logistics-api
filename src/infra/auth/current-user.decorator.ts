import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { UserPayload } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (object: Record<'admin', boolean | undefined>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    if (object?.admin && request.user.role !== 'admin')
      throw new UnauthorizedException(
        'User must be admin to access this controller.',
      )

    return request.user as UserPayload
  },
)
