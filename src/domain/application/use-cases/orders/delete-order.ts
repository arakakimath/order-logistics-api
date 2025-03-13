import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { OrderNotFoundError } from '../errors/order-not-found.error'
import { CourierNOrderDontMatchError } from '../errors/wrong-courier.error'
import { isUserAdmin } from '../utils/is-user-admin'
import { MustBeAdminError } from '../errors/must-be-admin.error'

interface DeleteOrderUseCaseRequest {
  user: User
  orderID: string
}

type DeleteOrderUseCaseResponse = Either<
  CourierNOrderDontMatchError | OrderNotFoundError | MustBeAdminError,
  null
>

@Injectable()
export class DeleteOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    user,
    orderID,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    if (!isUserAdmin(user)) return left(new MustBeAdminError())

    const order = await this.ordersRepository.findByID(orderID)

    if (!order) return left(new OrderNotFoundError(orderID))

    await this.ordersRepository.delete(order)

    return right(null)
  }
}
