import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../../repositories/orders.repository'
import { User } from '@/core/types/user'
import { MustBeAdminError } from '../errors/must-be-admin.error'
import { OrderNotFoundError } from '../errors/order-not-found.error'
import { OrderNotAvailableForDeliveryError } from '../errors/order-not-available-for-delivery.error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CourierNOrderDontMatchError } from '../errors/wrong-courier.error'
import { InvalidPhotoTypeError } from '../errors/invalid-photo-type.ereror'
import { Uploader } from '../../storage/uploader'

interface DeliverOrderUseCaseRequest {
  user: User
  orderID: string
  photoName: string
  photoType: string
  body: Buffer
}

type DeliverOrderUseCaseResponse = Either<
  MustBeAdminError | CourierNOrderDontMatchError,
  {
    order: Order
  }
>

@Injectable()
export class DeliverOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    user,
    orderID,
    body,
    photoName,
    photoType,
  }: DeliverOrderUseCaseRequest): Promise<DeliverOrderUseCaseResponse> {
    const order = await this.ordersRepository.findByID(orderID)

    if (!order) return left(new OrderNotFoundError(orderID))

    if (!order.courierID?.equals(new UniqueEntityID(user.id)))
      return left(new CourierNOrderDontMatchError(orderID))

    if (order.status !== 'withdrawn')
      return left(new OrderNotAvailableForDeliveryError(orderID))

    // Photo handling
    if (!/^(image\/(jpeg|png|jpg))/.test(photoType)) {
      return left(new InvalidPhotoTypeError())
    }

    const { url } = await this.uploader.upload({
      photoName,
      photoType,
      body,
    })

    order.status = 'delivered'
    order.photoUrl = url
    await this.ordersRepository.save(order)

    return right({ order })
  }
}
