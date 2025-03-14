import { OrderNotFoundError } from '@/domain/application/use-cases/errors/order-not-found.error'
import { CourierNOrderDontMatchError } from '@/domain/application/use-cases/errors/wrong-courier.error'
import { GetOrderUseCase } from '@/domain/application/use-cases/orders/get-order'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { OrderPresenter } from '@/infra/presenters/order.presenter'
import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('/orders/:orderID')
@ApiTags('Orders')
export class GetOrderController {
  constructor(private getOrderUseCase: GetOrderUseCase) {}

  @Get()
  async handle(
    @Param() { orderID }: Record<'orderID', string>,
    @CurrentUser() { sub: id, role }: UserPayload,
  ) {
    const result = await this.getOrderUseCase.execute({
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

        case CourierNOrderDontMatchError:
          throw new ConflictException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const { order } = result.value

    return OrderPresenter.toHTTP(order)
  }
}
