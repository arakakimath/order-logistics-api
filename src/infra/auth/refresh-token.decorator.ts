import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const RefreshToken = createParamDecorator(
  (_: never, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest()

    return request.cookies.refreshToken
  },
)
