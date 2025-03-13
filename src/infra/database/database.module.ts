import { Module } from '@nestjs/common'
import { MongooseService } from './mongoose/mongoose.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './mongoose/schemas/user.schema'
import { DeliveryPeopleRepository } from '@/domain/application/repositories/delivery-people.repository'
import { MongooseDeliveryPeopleRepository } from './mongoose/repositories/mongoose-delivery-people.repository'
import { Order, OrderSchema } from './mongoose/schemas/order.schema'
import { Recipient, RecipientSchema } from './mongoose/schemas/recipient.schema'
import { OrdersRepository } from '@/domain/application/repositories/orders.repository'
import { MongooseOrdersRepository } from './mongoose/repositories/mongoose-orders.repository'
import { RecipientsRepository } from '@/domain/application/repositories/recipients.repository'
import { MongooseRecipientsRepository } from './mongoose/repositories/mongoose-recipients.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Recipient.name, schema: RecipientSchema },
    ]),
  ],
  providers: [
    MongooseService,
    {
      provide: DeliveryPeopleRepository,
      useClass: MongooseDeliveryPeopleRepository,
    },
    {
      provide: OrdersRepository,
      useClass: MongooseOrdersRepository,
    },
    {
      provide: RecipientsRepository,
      useClass: MongooseRecipientsRepository,
    },
  ],
  exports: [
    MongooseService,
    DeliveryPeopleRepository,
    OrdersRepository,
    RecipientsRepository,
  ],
})
export class DatabaseModule {}
