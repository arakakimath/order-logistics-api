import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { MustBeAdminError } from '../errors/must-be-admin.error'
import { isUserAdmin } from '../utils/is-user-admin'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderNotFoundError } from '../errors/order-not-found.error'

interface UpdateOrderUseCaseRequest {
  user: User
  orderProps: {
    orderID: string
    recipientID?: string
    courierID?: string
    status?: 'pending' | 'withdrawn' | 'delivered' | 'returned'
    photoUrl?: string
  }
}

type UpdateOrderUseCaseResponse = Either<
  MustBeAdminError | OrderNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class UpdateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    user,
    orderProps,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    if (!isUserAdmin(user)) return left(new MustBeAdminError())

    const { orderID, status, photoUrl, courierID, recipientID } = orderProps

    const order = await this.ordersRepository.findByID(orderID)

    if (!order) return left(new OrderNotFoundError(orderID))

    order.courierID = courierID
      ? new UniqueEntityID(courierID)
      : order.courierID
    order.recipientID = recipientID
      ? new UniqueEntityID(recipientID)
      : order.recipientID
    order.status = status ?? order.status
    order.photoUrl = photoUrl ?? order.photoUrl

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
