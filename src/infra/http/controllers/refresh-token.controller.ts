import { RefreshTokenUseCase } from '@/domain/application/use-cases/refresh-token'
import { Public } from '@/infra/auth/public'
import { RefreshToken } from '@/infra/auth/refresh-token.decorator'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Res,
} from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'

@Controller('/auth/refresh')
@Public()
@ApiTags('Users')
export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh token.' })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', description: 'JWT Token.' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid JWT Token.',
  })
  async handle(@RefreshToken() refreshToken: string, @Res() res: Response) {
    const result = await this.refreshTokenUseCase.execute({ refreshToken })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const { accessToken } = result.value
    refreshToken = result.value.refreshToken

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      })
      .send({
        access_token: accessToken,
      })
  }
}
