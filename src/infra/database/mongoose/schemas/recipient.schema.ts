import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class Recipient {
  @Prop({
    required: true,
    type: String,
  })
  _id!: string

  @Prop({
    required: true,
  })
  name!: string
}

export type RecipientDocument = HydratedDocument<Recipient>
export const RecipientSchema = SchemaFactory.createForClass(Recipient)
