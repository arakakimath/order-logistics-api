import { Module } from "@nestjs/common"
import { MongooseService } from "./mongoose/mongoose.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./mongoose/schemas/user.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [MongooseService],
  exports: [MongooseService],
})
export class DatabaseModule {}
