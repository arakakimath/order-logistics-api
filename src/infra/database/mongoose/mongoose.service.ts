import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class MongooseService {
  constructor(@InjectModel(User.name) public readonly user: Model<User>) {}
}
