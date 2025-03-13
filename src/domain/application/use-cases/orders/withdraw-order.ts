import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { MustBeAdminError } from '../errors/must-be-admin.error'
import { OrderNotFoundError } from '../errors/order-not-found.error'
import { OrderNotAvailableForWithdrawError } from '../errors/order-not-available-for-withdraw.error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface WithdrawOrderUseCaseRequest {
  user: User
  orderID: string
}

type WithdrawOrderUseCaseResponse = Either<
  MustBeAdminError,
  {
    order: Order
  }
>

@Injectable()
export class WithdrawOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    user,
    orderID,
  }: WithdrawOrderUseCaseRequest): Promise<WithdrawOrderUseCaseResponse> {
    const order = await this.ordersRepository.findByID(orderID)

    if (!order) return left(new OrderNotFoundError(orderID))

    if (order.status !== 'pending')
      return left(new OrderNotAvailableForWithdrawError(orderID))

    order.status = 'withdrawn'
    order.courierID = new UniqueEntityID(user.id)

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
