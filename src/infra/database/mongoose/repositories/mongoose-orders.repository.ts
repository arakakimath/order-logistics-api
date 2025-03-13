import { OrdersRepository } from '@/domain/application/repositories/orders.repository'
import { Order } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { MongooseService } from '../mongoose.service'
import { MongooseOrderMapper } from '../mappers/mongoose-order.mapper'

@Injectable()
export class MongooseOrdersRepository implements OrdersRepository {
  constructor(private mongoose: MongooseService) {}

  async create(order: Order): Promise<void> {
    const data = MongooseOrderMapper.toMongoose(order)

    await this.mongoose.order.create(data)
  }

  async save(order: Order): Promise<void> {
    const data = MongooseOrderMapper.toMongoose(order)

    await this.mongoose.order.updateOne({ _id: data._id }, data)
  }

  async delete(order: Order): Promise<void> {
    await this.mongoose.order.deleteOne({ _id: order.id.toString() })
  }

  async findByID(id: string): Promise<Order | null> {
    const order = await this.mongoose.order.findById(id)

    return order ? MongooseOrderMapper.toDomain(order) : null
  }
}
