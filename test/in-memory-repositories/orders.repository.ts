import { OrdersRepository } from '@/domain/application/repositories/orders.repository'
import { Order } from '@/domain/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async save(order: Order): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(order.id))

    this.items[index] = order
  }

  async delete(order: Order): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByID(id: string): Promise<Order | null> {
    return this.items.filter((item) => item.id.toString() === id)[0]
  }
}
