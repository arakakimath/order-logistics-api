import { UpdateDeliveryPersonUseCase } from '@/domain/application/use-cases/users/update-delivery-person'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import { Body, Controller, NotFoundException, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

const updateBodySchema = z.object({
  cpf: z.string().length(14),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  admin: z.boolean().optional().default(false),
})

const bodyValidationPipe = new ZodValidationPipe(updateBodySchema)

type UpdateBodySchema = z.infer<typeof updateBodySchema>

@Controller('/users')
@ApiTags('Users')
export class UpdateUserController {
  constructor(private updateUseCase: UpdateDeliveryPersonUseCase) {}

  @Put()
  @ApiOperation({ summary: 'Update a delivery person.' })
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
        password: {
          type: 'string',
          minimum: 6,
          description: 'Delivery person password.',
        },
        admin: {
          type: 'boolean',
          description: 'Delivery person role.',
        },
      },
    },
    examples: {
      updateExample: {
        summary: 'Example of update',
        description: 'This is an example of update',
        value: {
          name: 'John Doe',
          password: 'password',
          admin: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Delivery person successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Delivery person not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request unauthorized.',
  })
  async handle(
    @Body(bodyValidationPipe) body: UpdateBodySchema, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser({ admin: true }) _: never,
  ) {
    const { cpf, name, password, admin } = body

    const result = await this.updateUseCase.execute({
      cpf,
      name,
      password,
      admin,
    })

    if (result.isLeft()) {
      const error = result.value
      throw new NotFoundException(error.message)
    }
  }
}
