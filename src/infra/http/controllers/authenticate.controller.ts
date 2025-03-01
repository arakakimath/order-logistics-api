import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { InvalidCpfError } from '@/domain/application/use-cases/errors/invalid-cpf.error'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials.error'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string().min(6),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/auth')
@ApiTags('Users')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

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
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
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

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
