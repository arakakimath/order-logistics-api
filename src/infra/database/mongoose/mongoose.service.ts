import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import { Model } from 'mongoose'
import { Order } from './schemas/order.schema'
import { Recipient } from './schemas/recipient.schema'

@Injectable()
export class MongooseService {
  constructor(
    @InjectModel(User.name) public readonly user: Model<User>,
    @InjectModel(Order.name) public readonly order: Model<Order>,
    @InjectModel(Recipient.name) public readonly recipient: Model<Recipient>,
  ) {}
}
