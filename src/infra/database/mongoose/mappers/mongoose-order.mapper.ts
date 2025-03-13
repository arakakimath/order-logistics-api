import { Order } from '@/domain/enterprise/entities/order'
import { MongooseTypes } from '../types/mongoose.types'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongooseOrderMapper {
  static toMongoose(order: Order): MongooseTypes.CreateOrder {
    return {
      _id: order.id.toString(),
      recipientID: order.recipientID.toString(),
      courierID: order.courierID ? order.courierID.toString() : undefined,
      status: order.status,
      photoUrl: order.photoUrl,
      returnReason: order.returnReason,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }

  static toDomain(order: MongooseTypes.CreateOrder): Order {
    return Order.create(
      {
        recipientID: new UniqueEntityID(order.recipientID),
        courierID: order.courierID
          ? new UniqueEntityID(order.courierID)
          : undefined,
        status: order.status,
        photoUrl: order.photoUrl,
        returnReason: order.returnReason,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
      new UniqueEntityID(order._id),
    )
  }
}
