import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { MustBeAdminError } from '../errors/must-be-admin.error'
import { isUserAdmin } from '../utils/is-user-admin'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { RecipientNotFoundError } from '../errors/recipient-not-found.error'
import { RecipientsRepository } from '../../repositories/recipients.repository'

interface CreateOrderUseCaseRequest {
  user: User
  recipientID: string
}

type CreateOrderUseCaseResponse = Either<
  MustBeAdminError | RecipientNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    user,
    recipientID,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    if (!isUserAdmin(user)) return left(new MustBeAdminError())

    const recipient = await this.recipientsRepository.findByID(recipientID)

    if (!recipient) return left(new RecipientNotFoundError(recipientID))

    const order = Order.create({
      recipientID: new UniqueEntityID(recipientID),
    })

    await this.ordersRepository.create(order)

    return right({ order })
  }
}
