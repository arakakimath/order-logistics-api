import { MustBeAdminError } from '@/domain/application/use-cases/errors/must-be-admin.error'
import { OrderNotFoundError } from '@/domain/application/use-cases/errors/order-not-found.error'
import { RecipientNotFoundError } from '@/domain/application/use-cases/errors/recipient-not-found.error'
import { UpdateOrderUseCase } from '@/domain/application/use-cases/orders/update-order'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

const updateOrderBodySchema = z.object({
  courierID: z.string().uuid().optional(),
  photoUrl: z.string().optional(),
  recipientID: z.string().uuid().optional(),
  returnReason: z.string().optional(),
  status: z.enum(['pending', 'withdrawn', 'delivered', 'returned']).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateOrderBodySchema)

type UpdateOrderBodySchema = z.infer<typeof updateOrderBodySchema>

@Controller('/orders/:orderID')
@ApiTags('Orders')
export class UpdateOrderController {
  constructor(private updateorderUseCase: UpdateOrderUseCase) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) body: UpdateOrderBodySchema,
    @Param() { orderID }: Record<'orderID', string>,
    @CurrentUser() { sub: id, role }: UserPayload,
  ) {
    const { recipientID, courierID, status, photoUrl, returnReason } = body

    const result = await this.updateorderUseCase.execute({
      user: {
        id,
        role,
      },
      orderProps: {
        orderID,
        recipientID,
        courierID,
        status,
        photoUrl,
        returnReason,
      },
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MustBeAdminError:
          throw new UnauthorizedException(error.message)

        case RecipientNotFoundError:
          throw new BadRequestException(error.message)

        case OrderNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
