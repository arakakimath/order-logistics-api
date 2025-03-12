import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { MustBeAdminError } from '../errors/must-be-admin.error'
import { isUserAdmin } from '../utils/is-user-admin'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateOrderUseCaseRequest {
  user: User
  recipientID: string
}

type CreateOrderUseCaseResponse = Either<
  MustBeAdminError,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    user,
    recipientID,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    if (!isUserAdmin(user)) return left(new MustBeAdminError())

    const order = Order.create({
      recipientID: new UniqueEntityID(recipientID),
    })

    await this.ordersRepository.create(order)

    return right({ order })
  }
}
