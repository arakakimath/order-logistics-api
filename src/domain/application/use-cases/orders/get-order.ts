import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { OrderNotFoundError } from '../errors/order-not-found.error'
import { CourierNOrderDontMatchError } from '../errors/wrong-courier.error'
import { isUserAdmin } from '../utils/is-user-admin'
import { MustBeAdminError } from '../errors/must-be-admin.error'

interface GetOrderUseCaseRequest {
  user: User
  orderID: string
}

type GetOrderUseCaseResponse = Either<
  CourierNOrderDontMatchError | OrderNotFoundError | MustBeAdminError,
  {
    order: Order
  }
>

@Injectable()
export class GetOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    user,
    orderID,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.ordersRepository.findByID(orderID)

    if (!order) return left(new OrderNotFoundError(orderID))

    const isSameCourier = order.courierID
      ? order.courierID.toString() !== user.id
      : false

    if (!isUserAdmin(user) && isSameCourier)
      return left(new CourierNOrderDontMatchError(orderID))

    return right({ order })
  }
}
