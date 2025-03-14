import { OrderNotAvailableForDeliveryOrReturnError } from '@/domain/application/use-cases/errors/order-not-available-for-delivery-or-return.error'
import { OrderNotAvailableForWithdrawError } from '@/domain/application/use-cases/errors/order-not-available-for-withdraw.error'
import { OrderNotFoundError } from '@/domain/application/use-cases/errors/order-not-found.error'
import { CourierNOrderDontMatchError } from '@/domain/application/use-cases/errors/wrong-courier.error'
import { ReturnOrderUseCase } from '@/domain/application/use-cases/orders/return-order'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import z from 'zod'

const returnOrderBodySchema = z.object({
  returnReason: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(returnOrderBodySchema)

type ReturnOrderBodySchema = z.infer<typeof returnOrderBodySchema>

@Controller('/orders/:orderID/return')
@ApiTags('Orders')
export class ReturnOrderController {
  constructor(private returnOrderUseCase: ReturnOrderUseCase) {}

  @Patch()
  async handle(
    @Body(bodyValidationPipe) body: ReturnOrderBodySchema,
    @Param() { orderID }: Record<'orderID', string>,
    @CurrentUser() { sub: id, role }: UserPayload,
  ) {
    const { returnReason } = body

    const result = await this.returnOrderUseCase.execute({
      user: {
        id,
        role,
      },
      orderID,
      returnReason,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrderNotFoundError:
          throw new NotFoundException(error.message)

        case OrderNotAvailableForDeliveryOrReturnError:
          throw new ConflictException(error.message)

        case CourierNOrderDontMatchError:
          throw new ConflictException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
