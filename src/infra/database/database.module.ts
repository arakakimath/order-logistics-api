import { Module } from '@nestjs/common'
import { MongooseService } from './mongoose/mongoose.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './mongoose/schemas/user.schema'
import { DeliveryPeopleRepository } from '@/domain/application/repositories/delivery-people.repository'
import { MongooseDeliveryPeopleRepository } from './mongoose/repositories/mongoose-delivery-people.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    MongooseService,
    {
      provide: DeliveryPeopleRepository,
      useClass: MongooseDeliveryPeopleRepository,
    },
  ],
  exports: [MongooseService, DeliveryPeopleRepository],
})
export class DatabaseModule {}
