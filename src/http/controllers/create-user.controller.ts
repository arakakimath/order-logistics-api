import { Controller, Get } from "@nestjs/common";
import { MongooseService } from "src/database/mongoose/mongoose.service";

@Controller('/users')
export class CreateUserController {
  constructor(private mongoose: MongooseService) {}

  @Get()
  async handle() {
    const result = await this.mongoose.user.find({ name: 'John Doe' })
    return JSON.stringify(result)
  }
}