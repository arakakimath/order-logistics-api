import { Order } from '@/domain/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      recipientID: order.recipientID.toString(),
      courierID: order.courierID ? order.courierID.toString() : undefined,
      status: order.status,
      returnReason: order.returnReason,
      photoUrl: order.photoUrl,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
