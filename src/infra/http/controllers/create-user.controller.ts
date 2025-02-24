import { RegisterDeliveryPersonUseCase } from '@/domain/application/use-cases/register-delivery-person'
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
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async handle(@Body() body: RegisterBodySchema) {}
}
