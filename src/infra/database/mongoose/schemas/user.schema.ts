import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class User {
  @Prop({
    required: true,
    type: String,
  })
  _id: string

  @Prop({
    required: true,
  })
  name: string

  @Prop({
    required: true,
    unique: true,
  })
  cpf: string

  @Prop({
    required: true,
  })
  password: string

  @Prop({
    required: true,
    default: false,
  })
  admin: boolean

  @Prop({
    required: false,
  })
  githubUsername: string
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)
