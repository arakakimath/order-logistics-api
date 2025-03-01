import { DeliveryPersonAlreadyExistsError } from '@/domain/application/use-cases/errors/delivery-person-already-exists.error'
import { InvalidCpfError } from '@/domain/application/use-cases/errors/invalid-cpf.error'
import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/register-delivery-person'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

const registerBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string().min(6),
  admin: z.boolean().optional().default(false),
})

type RegisterBodySchema = z.infer<typeof registerBodySchema>

@Controller('/users')
@ApiTags('Users')
export class CreateUserController {
  constructor(private registerUseCase: RegisterDeliveryPersonUseCase) { }

  @Post()
  @ApiOperation({ summary: 'Register a delivery person.' })
  @ApiBody({
    type: Object,
    description: 'Delivery person credentials for creating user.',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Delivery person name.',
        },
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
      registerExample: {
        summary: 'Example of register',
        description: 'This is an example of register',
        value: {
          name: 'John Doe',
          cpf: '123.456.789-00',
          password: 'password',
          admin: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Delivery person successfully registered.',
  })
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async handle(@Body() body: RegisterBodySchema) {
    const { name, cpf, password, admin } = body

    const result = await this.registerUseCase.execute({
      name,
      cpf,
      password,
      admin,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DeliveryPersonAlreadyExistsError:
          throw new ConflictException(error.message)

        case InvalidCpfError:
          throw new BadRequestException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
