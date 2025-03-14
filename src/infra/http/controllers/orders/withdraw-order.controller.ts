import { OrderNotAvailableForWithdrawError } from '@/domain/application/use-cases/errors/order-not-available-for-withdraw.error'
import { OrderNotFoundError } from '@/domain/application/use-cases/errors/order-not-found.error'
import { WithdrawOrderUseCase } from '@/domain/application/use-cases/orders/withdraw-order'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('/orders/:orderID/withdraw')
@ApiTags('Orders')
export class WithdrawOrderController {
  constructor(private withdrawOrderUseCase: WithdrawOrderUseCase) {}

  @Patch()
  async handle(
    @Param() { orderID }: Record<'orderID', string>,
    @CurrentUser() { sub: id, role }: UserPayload,
  ) {
    const result = await this.withdrawOrderUseCase.execute({
      user: {
        id,
        role,
      },
      orderID,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrderNotFoundError:
          throw new NotFoundException(error.message)

        case OrderNotAvailableForWithdrawError:
          throw new ConflictException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
