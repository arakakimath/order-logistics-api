import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class Order {
  @Prop({
    required: true,
    type: String,
  })
  _id!: string

  @Prop({
    required: true,
    alias: 'recipient_id',
  })
  recipientID!: string

  @Prop({
    required: false,
  })
  courierID?: string

  @Prop({
    required: true,
  })
  status!: 'pending' | 'withdrawn' | 'delivered' | 'returned'

  @Prop({
    required: false,
  })
  returnReason?: string

  @Prop({
    required: false,
  })
  photoUrl?: string

  @Prop({
    required: true,
    default: Date.now(),
  })
  createdAt!: Date

  @Prop({
    required: false,
  })
  updatedAt?: Date
}

export type OrderDocument = HydratedDocument<Order>
export const OrderSchema = SchemaFactory.createForClass(Order)
