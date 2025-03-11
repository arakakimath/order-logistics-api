import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { MustBeAdminError } from '../errors/must-be-admin'
import { OrderNotFoundError } from '../errors/order-not-found'
import { isUserAdmin } from '../utils/is-user.admin'

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
    if (!isUserAdmin(user)) return left(new MustBeAdminError())

    const order = await this.ordersRepository.findByID(orderID)

    if (!order) return left(new OrderNotFoundError(orderID))

    order.status = 'withdrawn'

    return right({ order })
  }
}
