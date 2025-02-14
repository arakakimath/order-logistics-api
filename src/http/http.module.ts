import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CreateUserController } from "./controllers/create-user.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
})
export class HTTPModule {}