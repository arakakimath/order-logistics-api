import { MustBeAdminError } from '@/domain/application/use-cases/errors/must-be-admin.error'
import { RecipientNotFoundError } from '@/domain/application/use-cases/errors/recipient-not-found.error'
import { CreateOrderUseCase } from '@/domain/application/use-cases/orders/create-order'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

const createorderBodySchema = z.object({
  recipientID: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(createorderBodySchema)

type CreateOrderBodySchema = z.infer<typeof createorderBodySchema>

@Controller('/orders')
@ApiTags('Orders')
export class CreateOrderController {
  constructor(private createorderUseCase: CreateOrderUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateOrderBodySchema,
    @CurrentUser() { sub: id, role }: UserPayload,
  ) {
    const { recipientID } = body

    const result = await this.createorderUseCase.execute({
      user: {
        id,
        role,
      },
      recipientID,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MustBeAdminError:
          throw new UnauthorizedException(error.message)

        case RecipientNotFoundError:
          throw new BadRequestException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
