import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { OrderNotFoundError } from '../errors/order-not-found.error'
import { OrderNotAvailableForDeliveryOrReturnError } from '../errors/order-not-available-for-delivery-or-return.error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CourierNOrderDontMatchError } from '../errors/wrong-courier.error'

interface ReturnOrderUseCaseRequest {
  user: User
  orderID: string
  returnReason: string
}

type ReturnOrderUseCaseResponse = Either<
  | CourierNOrderDontMatchError
  | OrderNotAvailableForDeliveryOrReturnError
  | OrderNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class ReturnOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    user,
    orderID,
    returnReason,
  }: ReturnOrderUseCaseRequest): Promise<ReturnOrderUseCaseResponse> {
    const order = await this.ordersRepository.findByID(orderID)

    if (!order) return left(new OrderNotFoundError(orderID))

    if (!order.courierID?.equals(new UniqueEntityID(user.id)))
      return left(new CourierNOrderDontMatchError(orderID))

    if (order.status !== 'withdrawn')
      return left(new OrderNotAvailableForDeliveryOrReturnError(orderID))

    order.status = 'returned'
    order.returnReason = returnReason
    await this.ordersRepository.save(order)

    return right({ order })
  }
}
