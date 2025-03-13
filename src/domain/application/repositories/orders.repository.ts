import { Order } from '@/domain/enterprise/entities/order'

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<void>
  abstract save(order: Order): Promise<void>
  abstract delete(order: Order): Promise<void>
  abstract findByID(id: string): Promise<Order | null>
}
