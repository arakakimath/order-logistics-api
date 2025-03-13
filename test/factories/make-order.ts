import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { MongooseService } from '@/infra/database/mongoose/mongoose.service'
import { MongooseOrderMapper } from '@/infra/database/mongoose/mappers/mongoose-order.mapper'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      recipientID: new UniqueEntityID(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return order
}

@Injectable()
export class OrderFactory {
  constructor(private mongoose: MongooseService) {}

  async makeMongooseOrder(data: Partial<OrderProps> = {}): Promise<Order> {
    const order = makeOrder(data)

    await this.mongoose.order.create(MongooseOrderMapper.toMongoose(order))

    return order
  }
}
