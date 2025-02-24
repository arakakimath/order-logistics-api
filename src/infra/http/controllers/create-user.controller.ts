import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MongooseService } from 'src/infra/database/mongoose/mongoose.service'
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
  constructor(private mongoose: MongooseService) {}

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
  async handle(@Body() body: RegisterBodySchema) {}
}
