import { AuthenticateUseCase } from '@/domain/application/use-cases/users/authenticate'
import { InvalidCpfError } from '@/domain/application/use-cases/errors/invalid-cpf.error'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials.error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string().min(6),
})

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema)

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/auth')
@Public()
@ApiTags('Users')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) { }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Authenticate a delivery person.' })
  @ApiBody({
    type: Object,
    description: 'Delivery person credentials for authenticating user.',
    schema: {
      type: 'object',
      properties: {
        cpf: {
          type: 'string',
          description: 'Delivery person cpf.',
        },
        password: {
          type: 'string',
          minimum: 6,
          description: 'Delivery person password.',
        },
      },
    },
    examples: {
      authenticationExample: {
        summary: 'Example of authentication',
        description: 'This is an example of authentication',
        value: {
          cpf: 'XXX.XXX.XXX-XX',
          password: 'password',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', description: 'JWT Token.' },
      },
    },
  })
  async handle(
    @Body(bodyValidationPipe) body: AuthenticateBodySchema,
    @Res() res: Response,
  ) {
    const { cpf, password } = body

    const result = await this.authenticateUseCase.execute({ cpf, password })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)

        case InvalidCpfError:
          throw new BadRequestException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken, refreshToken } = result.value

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
